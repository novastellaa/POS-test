import express from 'express';
import transactionController from '../controllers/transactionController.js';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import { createTransactionSchema, } from '../schema/transactionSchema.js';


const router = express.Router();

router.post(
    '/', [
        body('items').isArray({ min: 1 }).withMessage('Items array required'),
        body('items.*.product_id').notEmpty().withMessage('product_id required'),
        body('items.*.quantity').isInt({ min: 1 }).withMessage('quantity must be >= 1')
    ],
    validate(createTransactionSchema),
    transactionController.createTransaction
);

router.get('/', transactionController.listTransactions);

router.get('/:id', transactionController.getTransaction);

export default router;