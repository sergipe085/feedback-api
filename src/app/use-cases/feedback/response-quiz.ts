import { InterviewRepository } from "../../repositories/interview-repository";
import { Question } from "../../entities/feedback/question";
import { Response } from "../../entities/feedback/response";
import { QuestionRepository } from "../../repositories/question-repository";
import { Interview } from "../../entities/feedback/interview";
import { ResponseRepository } from "../../repositories/response-repository";

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
                private questionRepository: QuestionRepository,
                private responseRepository: ResponseRepository) {}

    async execute({ responses }: IResponseQuizUseCase) {
        const interview = await this.interviewRepository.save(new Interview({}));

        console.log(responses);

        const saved_responses = [] as Response[]

        for (var i = 0; i < responses.length; i++) {
            const response = new Response({
                interview_id: interview.id ?? -1,
                note: responses[i].note,
                obs: responses[i].obs,
                question_id: responses[i].question_id
            })

            const saved_response = await this.responseRepository.save(response);

            saved_responses.push(saved_response);
        }

        
        return {
            saved_responses
        };
    }
}