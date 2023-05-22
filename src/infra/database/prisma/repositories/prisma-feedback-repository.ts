import { Feedback } from "../../../../app/entities/feedback"
import { FeedbackRepository } from "../../../../app/repositories/feedback-repository"
import { DomainToPrisma, PrismaToDomain } from "../../../../utils/mappers/feedback-mapper";
import prisma from "..";

export class PrismaFeedbackRepository extends FeedbackRepository {
    async save(feedback: Feedback): Promise<Feedback> {
        const newFeedback = await prisma.feedback.create({
            data: {
                note: feedback.note,
                user_id: feedback.user_id ?? "",
                obs: feedback.obs,
            }
        })

        return PrismaToDomain(newFeedback);
    }

    async update(feedback: Feedback): Promise<Feedback> {
        const feedbackUpdated = await prisma.feedback.update({
            where: {
                id: feedback.id
            },
            data: DomainToPrisma(feedback)
        });

        return PrismaToDomain(feedbackUpdated);
    }

    async findAll(): Promise<Feedback[]> {
        var feedbacks = await prisma.feedback.findMany();
        var _feedbacks = feedbacks.map(f => PrismaToDomain(f))
        return _feedbacks;
    }
}