import { Interview } from "@entities/feedback/interview";

export abstract class InterviewRepository {
    abstract save(interview: Interview): Promise<Interview>;
    abstract findAll(): Promise<Interview[]>;
}