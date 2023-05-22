import { Router } from "express"
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import prisma from "../../database/prisma/index";
import middlewares from "../middlewares";

import auth_routes from "./auth.routes";

const routes = Router();

routes.use("/", auth_routes);

routes.get("/auth", middlewares.useAuth, (req, res) => {
    return res.json("AUTH")
})

export default routes;