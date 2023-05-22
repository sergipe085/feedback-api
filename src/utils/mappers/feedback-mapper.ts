import { Feedback as FeedbackDomain } from "../../app/entities/feedback"
import { feedback as FeedbackPrisma } from "@prisma/client"

export function PrismaToDomain(FeedbackPrisma: FeedbackPrisma): FeedbackDomain {
    const Feedback = new FeedbackDomain({ 
        id: FeedbackPrisma.id,
        note: FeedbackPrisma.note,
        user_id: FeedbackPrisma.user_id,
        obs: FeedbackPrisma.obs
    });

    return Feedback;
}

export function DomainToPrisma(FeedbackDomain: FeedbackDomain): FeedbackPrisma {
    return {
        id: FeedbackDomain.id ?? "",
        note: FeedbackDomain.note,
        obs: FeedbackDomain.obs,
        user_id: FeedbackDomain.user_id
    }
}