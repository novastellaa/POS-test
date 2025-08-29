import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import productController from '../controllers/productController.js';
import { createProductSchema, updateProductSchema } from '../schema/productSchema.js';


const router = express.Router();

router.post(
    '/', [
        body('name').notEmpty().withMessage('Name required'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
        body('stock').isInt({ min: 0 }).withMessage('Stock must be >= 0')
    ],
    validate(createProductSchema),
    productController.createProduct
);

router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

router.put(
    '/:id', [
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('price').optional().isFloat({ min: 0 }).withMessage('Price must be >= 0'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be >= 0')
    ],
    validate(updateProductSchema),
    productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

export default router;