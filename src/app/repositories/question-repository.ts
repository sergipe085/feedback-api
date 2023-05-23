import { Question } from "@entities/feedback/question";

export abstract class QuestionRepository {
    abstract save(interview: Question): Promise<Question>;
    abstract findById(id: string): Promise<Question>;
    abstract findAll(): Promise<Question[]>;
}