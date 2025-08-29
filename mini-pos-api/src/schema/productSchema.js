import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Name required"),
    price: z.number().min(0, "Price must be >= 0"),
    stock: z.number().int().min(0, "Stock must be >= 0"),
});

export const updateProductSchema = z.object({
    name: z.string().min(1, "Name cannot be empty").optional(),
    price: z.number().min(0, "Price must be >= 0").optional(),
    stock: z.number().int().min(0, "Stock must be >= 0").optional(),
});