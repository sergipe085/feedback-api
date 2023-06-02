import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../../app/repositories/user-repository";
import { PrismaUserRepository } from "../../database/prisma/repositories/prisma-user-repository";
import { AppError } from "../errors/app-error";

export async function useAuth(req: Request, res: Response, next: NextFunction) {
    var authToken = req.headers.authorization;

    console.log(authToken);
    
    if (!authToken) {
        throw new AppError("not authenticated", 401);
    }

    const userToken = authToken.split(" ")[1];
    const tokenPayload: any = jwt.verify(userToken, process.env.JWT_SECRET ?? "");

    console.log(tokenPayload);

    if (!tokenPayload.email) {
        throw new AppError("not authenticated", 401);
    }


    const usersRepository: UserRepository = new PrismaUserRepository();

    var user = await usersRepository.findByEmail(tokenPayload.email);

    if (!user) {
        throw new AppError("not authenticated", 401);
    }

    req.body.user = user;
    console.log(user);

    next();
}