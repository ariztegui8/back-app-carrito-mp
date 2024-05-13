import { ObjectId } from 'mongodb';

// Función para crear un nuevo registro de pago en la base de datos
export const createPayment = async (db, paymentData) => {
  const collection = db.collection('payments');
  return await collection.insertOne(paymentData);
};

// Función para obtener un pago por ID
export const getPaymentById = async (db, id) => {
  const collection = db.collection('payments');
  return await collection.findOne({ _id: id });  // Aquí ya no convertimos id a ObjectId
};

// Función para actualizar un pago por ID
export const updatePayment = async (db, id, paymentData) => {
  const collection = db.collection('payments');
  return await collection.updateOne({ _id: id }, { $set: paymentData });  // Aquí también mantenemos el id como string
};

// Función para listar todos los pagos (opcionalmente podrías añadir filtros y paginación)
export const getAllPayments = async (db) => {
  const collection = db.collection('payments');
  return await collection.find({}).toArray();
};
