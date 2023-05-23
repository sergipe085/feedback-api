import { InterviewRepository } from "../../repositories/interview-repository";
import { Question } from "../../entities/feedback/question";
import { Response } from "../../entities/feedback/response";
import { FeedbackRepository } from "../../repositories/feedback-repository";
import { QuestionRepository } from "../../repositories/question-repository";
import { Interview } from "../../entities/feedback/interview";

interface IResponseQuizUseCase {
    responses: [
        {
            question_id: string;
            note: number;
            obs: string
        }
    ]
}

export class ResponseQuiz {
    constructor(private interviewRepository: InterviewRepository,
                private questionRepository: QuestionRepository) {}

    async execute({ responses }: IResponseQuizUseCase) {
        const interview = await this.interviewRepository.save(new Interview({}));

        for (var i = 0; i < responses.length; i++) {
            const response = new Response({
                interview_id: interview.id ?? -1,
                note: responses[i].note,
                obs: responses[i].obs,
                question_id: responses[i].question_id
            })

            console.log(response);
        }

        
        return {"test": "ok"};
    }
}