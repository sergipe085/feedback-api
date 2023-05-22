import { Router } from "express"
import { LoginUseCase } from "../../../app/use-cases/auth/login-usecase";
import { RegisterUseCase } from "../../../app/use-cases/auth/register-usecase";
import { PrismaUserRepository } from "../../database/prisma/repositories/prisma-user-repository";

const auth_routes = Router();

const userRepository = new PrismaUserRepository();

auth_routes.post("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    const loginUseCase = new LoginUseCase(userRepository);

    const response = await loginUseCase.execute({ email, password });

    return res.json(response);
});

auth_routes.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const registerUseCase = new RegisterUseCase(userRepository);

    const response = await registerUseCase.execute({
        name,
        email,
        password
    });

    return res.json(response);
});

export default auth_routes;