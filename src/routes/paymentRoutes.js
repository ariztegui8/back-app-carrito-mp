import express from 'express';
import { createOrderController, receiveWebhookController, getPaymentByIdController, getAllPaymentsController } from '../controllers/paymentController.js';

const router = express.Router();

const paymentRoutes = (db) => {
    router.post('/create-order', (req, res) => {
        createOrderController(req, res, db);
    });

    router.get('/success', (req, res) => {
        res.send('success');
    });

    router.get('/failure', (req, res) => {
        res.send('failure');
    });

    router.get('/pending', (req, res) => {
        res.send('pending');
    });

    router.post('/webhook', (req, res) => {
        receiveWebhookController(req, res, db);
    });

    router.get('/:id', (req, res) => {
        getPaymentByIdController(req, res, db);
    });

    router.get('/', (req, res) => {
        getAllPaymentsController(req, res, db);
    });

    return router;
};

export default paymentRoutes;
