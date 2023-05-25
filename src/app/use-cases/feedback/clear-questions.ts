import { Question } from "../../entities/feedback/question";
import { Interview } from "../../entities/feedback/interview";
import { User } from "../../entities/user";
import { InterviewRepository } from "../../repositories/interview-repository";
import { QuestionRepository } from "../../repositories/question-repository";


export class ClearQuestion {
    constructor(private questionRepository: QuestionRepository) {}

    async execute() {
        await this.questionRepository.clear()

        const response = {
            
        }
        return response
    }
}