import { Question } from "../../entities/feedback/question";
import { Interview } from "../../entities/feedback/interview";
import { User } from "../../entities/user";
import { InterviewRepository } from "../../repositories/interview-repository";
import { QuestionRepository } from "../../repositories/question-repository";
import { FieldValidation } from "../../../utils/validation/field-validation";

interface IAddQuestionUseCaseProps {
    content: string;
}

export class AddQuestion {
    constructor(private questionRepository: QuestionRepository) {}

    async execute({ content }: IAddQuestionUseCaseProps) {
        const question_content_validation = new FieldValidation(content, "content")
        question_content_validation.checkString()
        question_content_validation.checkNull()
        question_content_validation.checkLength(6)

        const new_question = new Question({
            content,
            created_at: new Date(),
            deleted_at: null
        });

        const saved_question = await this.questionRepository.save(new_question)

        const response = {
            question: saved_question
        }
        return response
    }
}