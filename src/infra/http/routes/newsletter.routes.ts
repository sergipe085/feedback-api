import { Router } from "express"
import { SendNewsletterUsecase } from "../../../app/use-cases/newsletter/send-newsletter-usecase";
import { SubscribeToNewsletterUsecase } from "../../../app/use-cases/newsletter/subscribe-to-newsletter-usecase";
import { PrismaSubscriptionRepository } from "../../../infra/database/prisma/repositories/prisma-subscription-repository";

const newsletter_routes = Router();

const newsletterSubscriptionRepository = new PrismaSubscriptionRepository();

newsletter_routes.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    console.log(email);

    const subscribeToNewsletterUseCase = new SubscribeToNewsletterUsecase(newsletterSubscriptionRepository);

    const response = await subscribeToNewsletterUseCase.execute(email);

    return res.json(response);
});

newsletter_routes.post("/send", async (req, res) => {
    const { title, content } = req.body;

    const sendNewsletterUseCase = new SendNewsletterUsecase(newsletterSubscriptionRepository);

    const response = await sendNewsletterUseCase.execute({ title, content });

    return res.json(response);
});


export default newsletter_routes;