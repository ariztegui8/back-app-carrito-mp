import express from 'express';
import multer from 'multer';
import { createProductController, deleteProductController, getAllProductController, getProductControllerById, updateProductController } from '../controllers/productController.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const router = express.Router();


const productRoutes = (db) => {
    router.post('/', upload.single('image'), (req, res) => {
        createProductController(req, res, db)
    })

    router.get('/', (req, res) => {
        getAllProductController(req, res, db)
    })

    router.get('/:id', (req, res) => {
        getProductControllerById(req, res, db)
    })

    router.put('/:id', upload.single('image'), (req, res) => {
        updateProductController(req, res, db)
    })

    router.delete('/:id', (req, res) => {
        deleteProductController(req, res, db)
    })

    return router;
}

export default productRoutes;
