import express from 'express';
import productController from '../controllers/productController.js';
import { validate } from '../middlewares/validate.js';
import { createProductSchema, updateProductSchema } from '../schema/productSchema.js';

const router = express.Router();

router.post('/', validate(createProductSchema), productController.createProduct);
router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;