import { Router } from "express"
import middlewares from "../middlewares";
import { AddQuestion } from "../../../app/use-cases/feedback/add-question";
import { PrismaInterviewRepository } from "../../database/prisma/repositories/prisma-interview-repository";
import { PrismaQuestionRepository } from "../../database/prisma/repositories/prisma-question-repository";
import { ResponseQuiz } from "../../../app/use-cases/feedback/response-quiz";
import { PrismaResponseRepository } from "../../database/prisma/repositories/prisma-response-repository";
import { ListQuestions } from "../../../app/use-cases/feedback/list-questions";
import { DeleteQuestion } from "../../../app/use-cases/feedback/delete-question";
import { ClearQuestion } from "../../../app/use-cases/feedback/clear-questions";
import { ListInterview } from "../../../app/use-cases/feedback/list-interview";

const quiz_routes = Router();

const interviewRepository = new PrismaInterviewRepository();
const questionRepository = new PrismaQuestionRepository();
const responseRepository = new PrismaResponseRepository();

quiz_routes.post("/question", middlewares.useAuth, async (req, res) => {
    const { content } = req.body;

    const add_question = new AddQuestion(questionRepository);

    const response = await add_question.execute({ content });

    return res.json(response);
});

quiz_routes.get("/question", middlewares.useAuth, async (req, res) => {
    const list_questions = new ListQuestions(questionRepository);

    const response = await list_questions.execute();

    return res.json(response);
});

quiz_routes.delete("/question/:question_id", middlewares.useAuth, async (req, res) => {
    const delete_question = new DeleteQuestion(questionRepository);
    const { question_id } = req.params;

    const response = await delete_question.execute({ question_id });

    return res.json(response);
});

quiz_routes.delete("/question", middlewares.useAuth, async (req, res) => {
    const clear_questions = new ClearQuestion(questionRepository);

    const response = await clear_questions.execute();

    return res.json(response);
});

quiz_routes.get("/interview", middlewares.useAuth, async (req, res) => {
    const list_interview = new ListInterview(responseRepository, interviewRepository, questionRepository);

    const response = await list_interview.execute({interviewId: "1"});

    return res.json(response);
})

quiz_routes.post("/response", async (req, res) => {
    const { responses } = req.body;

    const response_quiz = new ResponseQuiz(interviewRepository, questionRepository, responseRepository);

    const response = await response_quiz.execute({ responses });

    return res.json(response);
});

export default quiz_routes;