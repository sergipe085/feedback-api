import { Question } from "../../entities/feedback/question";
import { Interview } from "../../entities/feedback/interview";
import { User } from "../../entities/user";
import { InterviewRepository } from "../../repositories/interview-repository";
import { QuestionRepository } from "../../repositories/question-repository";

interface IAddQuestionUseCaseProps {
    content: string;
}

export class AddQuestion {
    constructor(private questionRepository: QuestionRepository) {}

    async execute({ content }: IAddQuestionUseCaseProps) {
        const new_question = new Question({
            content
        });

        const saved_question = await this.questionRepository.save(new_question)

        const response = {
            question: saved_question
        }
        return response
    }
}