import { Question } from "../../entities/feedback/question";
import { Interview } from "../../entities/feedback/interview";
import { User } from "../../entities/user";
import { InterviewRepository } from "../../repositories/interview-repository";
import { QuestionRepository } from "../../repositories/question-repository";

export class ListQuestions {
    constructor(private questionRepository: QuestionRepository) {}

    async execute() {
        const questions = await this.questionRepository.findAll()

        const response = {
            questions
        }
        return response
    }
}