import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import {config} from 'dotenv';
import productRoutes from './routes/productRoutes.js';


config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const urlMongo = `${process.env.MONGO_URL}?retryWrites=true&w=majority`

const client = new MongoClient(urlMongo)

async function main() {
  try {
    await client.connect()
    console.log('Conectado a la base de datos')
    const db = client.db('cart-shop')

    app.use('/api/product', productRoutes(db))
 

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  } catch (error) {
    console.error('Error conectando a la base de datos:', error)
    process.exit(1)
  }
}

main()
