import { Router } from "express"
import { ProcessSubscriptionUseCase } from "../../../app/use-cases/subscription/process-subscription-usecase";
import { StartSubscriptionUseCase } from "../../../app/use-cases/subscription/start-subscription-usecase";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import prisma from "../../database/prisma/index";
import middlewares from "../middlewares";

import auth_routes from "./auth.routes";
import newsletter_routes from "./newsletter.routes";
import stripe_routes from "./stripe.routes";

const routes = Router();

routes.use("/", auth_routes);
routes.use("/newsletter", newsletter_routes);
routes.use("/stripe", stripe_routes);

routes.get("/test", async (req, res) => {
    const usersRepository = new PrismaUserRepository();
    const a = new ProcessSubscriptionUseCase(usersRepository);
    const b = new StartSubscriptionUseCase(usersRepository);
    // await a.execute("sub_1MgZlAKYNxpt6pvxvEog7tam");
    const user = await usersRepository.findByEmail("test48@gmail.com")

    if (!user) return;
    await b.execute({
        user: user,
        subscription_level: 1,
    })

    res.send();
})

routes.get("/auth", middlewares.useAuth, (req, res) => {
    return res.json("AUTH")
})

export default routes;