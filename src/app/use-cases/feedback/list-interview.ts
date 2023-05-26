import { Question } from "../../entities/feedback/question";
import { Interview } from "../../entities/feedback/interview";
import { User } from "../../entities/user";
import { InterviewRepository } from "../../repositories/interview-repository";
import { QuestionRepository } from "../../repositories/question-repository";
import { ResponseRepository } from "../../repositories/response-repository";

interface IListInterviewUseCaseProps {
    interviewId: string;
}

export class ListInterview {
    constructor(private responseRepository: ResponseRepository, private interviewRepository: InterviewRepository, private questionRepository: QuestionRepository) {}

    async execute({ interviewId }: IListInterviewUseCaseProps) {
        
        const _interviews = await this.interviewRepository.findAll();

        const interviews: any[] = []
        for(var i = 0; i < _interviews.length; i++) {
            const responses = await this.responseRepository.findByInterviewId(_interviews[i].id ?? -1);

            const interview_response: any[] = []

            for(var j = 0; j < responses.length; j++) {

                const question = await this.questionRepository.findById(responses[j].question_id ?? "");
                interview_response.push({
                    question: question?.content,
                    note: responses[j].note,
                    obs: responses[j].obs
                })
            }
            if (interview_response.length > 0) {
                interviews.push({interview_response})
            }
        }


        const response = {
            interviews
        }
        return response
    }
}