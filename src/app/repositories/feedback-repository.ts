import { Feedback } from "@entities/feedback";

export abstract class FeedbackRepository {
    abstract save(feedback: Feedback): Promise<Feedback>;
    abstract findAll(): Promise<Feedback[]>;
}