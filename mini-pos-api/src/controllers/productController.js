import productModel from '../models/productModel.js';

export async function createProduct(req, res, next) {
    try {
        const { name, price, stock } = req.body;
        const product = await productModel.createProduct({ name, price, stock });
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: product
        });
    } catch (err) {
        next(err);
    }
}

export async function listProducts(req, res, next) {
    try {
        const products = await productModel.getAllProducts();
        res.json({
            success: true,
            product: products
        });
    } catch (err) {
        next(err);
    }
}

export async function getProduct(req, res, next) {
    try {
        const product = await productModel.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({
            success: true,
            product: product
        });
    } catch (err) {
        next(err);
    }
}

export async function updateProduct(req, res, next) {
    try {
        const updated = await productModel.updateProduct(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.json({
            success: true,
            message: "Product updated successfully",
            product: updated
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const deleted = await productModel.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully",
            product: deleted
        });
    } catch (err) {
        next(err);
    }
}


export default { createProduct, listProducts, getProduct, updateProduct, deleteProduct };