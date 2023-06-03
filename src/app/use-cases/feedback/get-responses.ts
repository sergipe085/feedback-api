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

interface IResponse {
    question: string;
    good: number;
    medium: number;
    bad: number;
    obs: string[]
}

export class GetResponses {
    constructor(private questionRepository: QuestionRepository,
                private responseRepository: ResponseRepository) {}

    async execute() {
        const questions = await this.questionRepository.findAll();

        const response: IResponse[] = [];

        for (var i = 0; i < questions.length; i++) {
            const responses = await this.responseRepository.findByQuestionId(questions[i].id ?? "");

            var good = 0;
            var medium = 0;
            var bad = 0;
            var obs: string[] = [];

            for (var j = 0; j < responses.length; j++) {
                if (responses[j].note == 1) {
                    bad += 1
                }
                else if (responses[j].note == 2) {
                    medium += 1
                }
                else if (responses[j].note == 3) {
                    good += 1
                }

                if (responses[j].obs) {
                    obs.push(responses[j].obs)
                }
            }
        

            response.push({
                question: questions[i].content,
                bad,
                medium,
                good,
                obs
            })
        }       
        return {
            results: response
        };
    }
}