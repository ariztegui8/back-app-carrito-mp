import {config} from 'dotenv'
config();

export const PORT = 3001;

export const HOST = `http://localhost:${PORT}`

export const MERCADOPAGO_API_KEY = process.env.MP_ACCESS_TOKEN;