import express from 'express';
import productsRouter from './product.js';
import transactionsRouter from './transactions.js';

const router = express.Router();

router.use('/products', productsRouter);
router.use('/transactions', transactionsRouter);

export default router;