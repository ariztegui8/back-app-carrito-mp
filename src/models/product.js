import { ObjectId } from 'mongodb'

export const createProduct = async (db, data) => {
  const collection = db.collection('product')
  return await collection.insertOne(data)
}

export const getAllProduct = async (db) => {
  const collection = db.collection('product')
  return await collection.find({}).toArray()
}

export const getProductById = async (db, id) => {
  const collection = db.collection('product');
  return await collection.findOne({ _id: new ObjectId(id) })
}

export const updateProduct = async (db, id, data) => {
  const collection = db.collection('product')
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
}

export const deleteProduct = async (db, id) => {
  const collection = db.collection('product')
  return await collection.deleteOne({ _id: new ObjectId(id) })
}