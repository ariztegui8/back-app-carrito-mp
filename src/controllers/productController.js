import { createProduct, getProductById} from '../models/product.js';
import { ObjectId } from 'mongodb';
import cloudinary from '../cloudinary/cloudinaryConfig.js';

export const createProductController = async (req, res, db) => {
    try {
        const { title, description, price} = req.body

        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            image = result.secure_url
        } else {
            image = process.env.CLOU_DEFAULT_IMAGE_URL
        }

        const ProductData = { title, description, price, image };
        const result = await createProduct(db, ProductData);
        if (result.acknowledged) {
            const total = await db.collection('product').countDocuments();
            const totalPages = Math.ceil(total / 12);

            res.status(201).send({
                message: "Product creado exitosamente",
                productId: result.insertedId,
                imagePath: image,
                currentPage: Math.ceil(total / 12),
                totalPages: totalPages
            });
        } else {
            res.status(400).send({ error: "No se pudo crear el Product" });
        }
    } catch (error) {
        console.error('Error al crear Product', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}

export const getAllProductController = async (req, res, db) => {
    const { search, sort, page = 1, limit = 12 } = req.query
    const skip = (page - 1) * limit

    let query = {}
    if (search) {
        query = {
            $or: [
                { title: { $regex: search, $options: "i" } },
            ]
        }
    }

    let sortOrder = {}
    if (sort === 'ASC') {
        sortOrder = { title: 1 }
    } else if (sort === 'DEC') {
        sortOrder = { title: -1 }
    }

    try {
        const product = await db.collection('product')
            .find(query)
            .sort(sortOrder)
            .skip(skip)
            .limit(parseInt(limit))
            .toArray()

        const total = await db.collection('product').countDocuments(query)

        res.status(200).send({
            product,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        })
    } catch (error) {
        console.error('Error al obtener Product', error)
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}

export const getProductControllerById = async (req, res, db) => {
    try {
        const product = await getProductById(db, req.params.id)
        if (product) {
            res.status(200).send(product)
        } else {
            res.status(404).send({ message: "Product no encontrado" })
        }
    } catch (error) {
        console.error('Error al obtener el Product', error)
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}

export const updateProductController = async (req, res, db) => {
    const { id } = req.params
    const { title, description, price } = req.body
    const data = { title, description, price, image }

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path)
        data.image = result.secure_url
    }

    try {
        const result = await db.collection('product').updateOne({ _id: new ObjectId(id) }, { $set: data })
        if (result.modifiedCount === 1) {
            const updatedProduct = await db.collection('product').findOne({ _id: new ObjectId(id) })
            if (updatedProduct) {
                res.status(200).send(updatedProduct)
            } else {
                res.status(404).send({ message: "Product actualizado pero no encontrado" })
            }
        } else {
            res.status(404).send({ message: "Product no encontrado o sin cambios" })
        }
    } catch (error) {
        console.error('Error al actualizar Product', error)
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}

export const deleteProductController = async (req, res, db) => {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "ID no válido" })
    }

    try {
        const result = await db.collection('product').deleteOne({ _id: new ObjectId(id) })
        if (result.deletedCount === 1) {
            res.status(200).send({ message: "Product eliminado exitosamente" })
        } else {
            res.status(404).send({ message: "Product no encontrado" })
        }
    } catch (error) {
        console.error('Error al eliminar Product', error);
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}
