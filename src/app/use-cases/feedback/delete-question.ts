import { Question } from "../../entities/feedback/question";
import { Interview } from "../../entities/feedback/interview";
import { User } from "../../entities/user";
import { InterviewRepository } from "../../repositories/interview-repository";
import { QuestionRepository } from "../../repositories/question-repository";

interface IDeleteQuestionUseCaseProps {
    question_id: string;
}


export class DeleteQuestion {
    constructor(private questionRepository: QuestionRepository) {}

    async execute({ question_id }: IDeleteQuestionUseCaseProps) {
        await this.questionRepository.delete(question_id)

        const response = {
            
        }
        return response
    }
}