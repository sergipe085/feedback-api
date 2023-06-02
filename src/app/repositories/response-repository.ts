import { Response } from "../entities/feedback/response";

export abstract class ResponseRepository {
    abstract save(response: Response): Promise<Response>;
    abstract findByInterviewId(interviewId: number): Promise<Response[]>
    abstract findByQuestionId(questionId: string): Promise<Response[]>
    abstract findAll(): Promise<Response[]>;
}