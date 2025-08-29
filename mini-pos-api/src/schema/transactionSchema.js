import { z } from "zod";

export const createTransactionSchema = z.object({
    items: z.array(
        z.object({
            product_id: z.string({ required_error: "product_id required" }),
            quantity: z.number().int().min(1, "quantity must be >= 1"),
        })
    ).min(1, "Items array required"),
});