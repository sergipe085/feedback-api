import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export async function useAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.body.user;

    if (!user) {
        throw new AppError("not authenticated", 401);
    }

    if (!user.isAdmin) {
        throw new AppError("not authorizated", 401);
    }

    next();
}