import { ZodError } from "zod";

export function errorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: err.errors.map(e => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
    }

    if (err.status) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}