import express, { Router } from "express"
import stripe from "../../../infra/services/stripe";
import { ProcessSubscriptionUseCase } from "../../../app/use-cases/subscription/process-subscription-usecase";
import { ProcessCancelledSubscriptionUseCase } from "../../../app/use-cases/subscription/proccess-canceled-subscription-usecase";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import middlewares from "../middlewares";
import { User } from "../../../app/entities/user";
import { StartSubscriptionUseCase } from "../../../app/use-cases/subscription/start-subscription-usecase";

const stripe_routes = Router();

const userRepository = new PrismaUserRepository();

const endpoint_secret = "whsec_296fc24a00a72f9480c5e020ef42b784c3edfe1712da0088c52465739823b87e"

stripe_routes.post("/webhook", express.raw({type: 'application/json'}), async (req, res) => {
    const payloadString = JSON.stringify(req.body, null, 2);
    
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpoint_secret,
    });
      
    const event = stripe.webhooks.constructEvent(payloadString, header, endpoint_secret);
    const data = event.data.object;
    const subscription_id = data.id;

    const process_sub = new ProcessSubscriptionUseCase(userRepository);
    const cancel_sub = new ProcessCancelledSubscriptionUseCase(userRepository);

    switch(event.type) {
        case "customer.subscription.created":
            console.log(data)
            // await process_sub.execute(subscription_id);
        break;
        case "customer.subscription.updated":
            console.log(data)
            // await process_sub.execute(subscription_id);
        break;
        case "customer.subscription.deleted":
            console.log(data);
            await cancel_sub.execute(data.metadata.user);
        break;
        case "invoice.paid":
            // console.log(data);
            await process_sub.execute(data.subscription);
        break;
    }
    return res.send();
})

stripe_routes.post("/start-subscription", middlewares.useAuth, async (req, res) => {
    const user = req.body.user;

    const startSubscriptionUseCase = new StartSubscriptionUseCase(userRepository);

    const response = await startSubscriptionUseCase.execute({
        user,
        subscription_level: 1
    });

    return res.json(response);
})

stripe_routes.post("/create-checkout-session", middlewares.useAuth, async (req, res) => {
    const user = req.body.user as User;

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1MgXscKYNxpt6pvxIFjDn8eV',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `http://127.0.0.1:5500/front-test/success.html`,
        cancel_url: `http://127.0.0.1:5500/front-test/cancel.html`,
        customer: user.stripe_customer_id,
        subscription_data: {
            metadata: {
                user: user.id,
                subscription_level: 1
            }
        }
    });
    
    res.json({
        session_url: session.url
    });
})

export default stripe_routes;