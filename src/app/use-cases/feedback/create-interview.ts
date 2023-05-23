import { Question } from "../../entities/feedback/question";
import { Interview } from "../../entities/feedback/interview";
import { User } from "../../entities/user";
import { InterviewRepository } from "../../repositories/interview-repository";
import { QuestionRepository } from "../../repositories/question-repository";

interface IGiveInterviewUseCaseProps {
    title: string,
    questions: Question[]
}

export class CreateInterview {
    constructor(private interviewRepository: InterviewRepository,
                private questionRepository: QuestionRepository) {}

    async execute({ title, questions }: IGiveInterviewUseCaseProps) {
        const new_interview = new Interview({
            title
        });

        const saved_Interview = await this.interviewRepository.save(new_interview)

        const new_questions: Question[] = []

        for (var i = 0; i < questions.length; i++) {
            const q = questions[i]

            const question = await this.questionRepository.save({
                interview_id: saved_Interview.id ?? "",
                content: q.content
            });
            console.log(question)

            new_questions.push(question)
            console.log(new_questions)
        }

        const interview = {
            id: saved_Interview.id,
            title: saved_Interview.title,
            questions: new_questions
        }
        return {
            interview
        }
    }
}