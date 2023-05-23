import { Router } from "express"
import middlewares from "../middlewares";
import { AddQuestion } from "../../../app/use-cases/feedback/add-question";
import { PrismaInterviewRepository } from "../../database/prisma/repositories/prisma-interview-repository";
import { PrismaQuestionRepository } from "../../database/prisma/repositories/prisma-question-repository";
import { ResponseQuiz } from "../../../app/use-cases/feedback/response-quiz";

const quiz_routes = Router();

const interviewRepository = new PrismaInterviewRepository();
const questionRepository = new PrismaQuestionRepository();

quiz_routes.post("/add-question", middlewares.useAuth, async (req, res) => {
    const { content } = req.body;

    const add_question = new AddQuestion(questionRepository);

    const response = await add_question.execute({ content });

    return res.json(response);
});

quiz_routes.post("/response", async (req, res) => {
    const { responses } = req.body;

    const response_quiz = new ResponseQuiz(interviewRepository, questionRepository);

    const response = await response_quiz.execute({ responses });

    return res.json(response);
});

export default quiz_routes;