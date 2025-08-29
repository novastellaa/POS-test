import transactionModel from '../models/transactionModel.js';

async function createTransaction(req, res, next) {
    try {
        const { items } = req.body;
        const result = await transactionModel.createTransaction({ items });
        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            product: result
        });
    } catch (err) {
        next(err);
    }
}

async function listTransactions(req, res, next) {
    try {
        const transactions = await transactionModel.getAllTransactions();
        res.json({
            success: true,
            product: transactions
        });
    } catch (err) {
        next(err);
    }
}

async function getTransaction(req, res, next) {
    try {
        const transaction = await transactionModel.getTransactionById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json({
            success: true,
            product: transaction
        });
    } catch (err) {
        next(err);
    }
}

export default { createTransaction, listTransactions, getTransaction };