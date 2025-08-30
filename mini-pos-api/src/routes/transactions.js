import express from 'express';
import transactionController from '../controllers/transactionController.js';
import { validate } from '../middlewares/validate.js';
import { createTransactionSchema } from '../schema/transactionSchema.js';

const router = express.Router();

router.post('/', validate(createTransactionSchema), transactionController.createTransaction);
router.get('/', transactionController.listTransactions);
router.get('/:id', transactionController.getTransaction);

export default router;