import { Router } from "express"
import { GiveFeedbackUseCase } from "../../../app/use-cases/feedback/give-feedback-usecase";
import { PrismaFeedbackRepository } from "../../database/prisma/repositories/prisma-feedback-repository";
import middlewares from "../middlewares";

const feedback_routes = Router();

const feedbackRepository = new PrismaFeedbackRepository();

feedback_routes.post("/", middlewares.useAuth, async (req, res) => {
    const { note, obs, user } = req.body;

    console.log(req.body);

    const giveFeedbackUseCase = new GiveFeedbackUseCase(feedbackRepository);

    const response = await giveFeedbackUseCase.execute({ user, note, obs });

    return res.json(response);
});

export default feedback_routes;