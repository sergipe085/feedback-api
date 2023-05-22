import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log("Error: " + err.message);

    if (err instanceof(AppError)) {
        const appError = err as AppError;

        return res.status(appError.status).json({
            error: "app error",
            status: appError.status,
            message: appError.message
        })
    }
    else {
        return res.status(500).json({
            error: "server error",
            status: 500,
            message: err.message
        })
    }
}

export default errorHandler;