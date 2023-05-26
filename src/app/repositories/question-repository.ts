import { Question } from "../entities/feedback/question";

export abstract class QuestionRepository {
    abstract save(interview: Question): Promise<Question>;
    abstract findById(id: string): Promise<Question | null>;
    abstract delete(id: string): Promise<void>
    abstract clear(): Promise<void>
    abstract findAll(): Promise<Question[]>;
}