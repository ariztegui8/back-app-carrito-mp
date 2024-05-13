import { createPayment, getPaymentById, updatePayment, getAllPayments } from '../models/payment.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { HOST, MERCADOPAGO_API_KEY } from '../../config.js';
import { ObjectId } from 'mongodb';

const client = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_API_KEY
});

const preference = new Preference(client);

export const createOrderController = async (req, res, db) => {
    const { items, back_urls, notification_url } = req.body;
    const body = {
        items,
        back_urls,
        notification_url,
    };
    const requestOptions = {
        idempotencyKey: 'UNIQUE_IDEMPOTENCY_KEY',
    };

    try {
        const result = await preference.create({ body, requestOptions });
        console.log("MercadoPago response:", result);
        const paymentData = {
            orderId: result.id,
            status: 'pending',
            details: result 
        };
        await createPayment(db, paymentData);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al crear la orden con MercadoPago:', error);
        res.status(500).json({ error: 'No se pudo crear la orden.', details: error.response ? error.response.data : error.message });
    }
};

export const receiveWebhookController = async (req, res, db) => {
    const paymentId = req.query['data.id'] || req.query.id;

    if (!paymentId) {
        console.error('No payment ID provided in webhook');
        return res.sendStatus(400);
    }

    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${client.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        // Actualizar el estado del pago en la base de datos
        await updatePayment(db, paymentId, { status: data.status, details: data });

        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send({ error: 'Error handling webhook', details: error.message });
    }
};

export const getPaymentByIdController = async (req, res, db) => {
    try {
        const payment = await getPaymentById(db, req.params.id);
        if (payment) {
            res.status(200).send(payment);
        } else {
            res.status(404).send({ message: "Pago no encontrado" });
        }
    } catch (error) {
        console.error('Error al obtener el pago', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getAllPaymentsController = async (req, res, db) => {
    try {
        const payments = await getAllPayments(db);
        res.status(200).send(payments);
    } catch (error) {
        console.error('Error al obtener los pagos', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};
