import { Interview as InterviewDomain } from "../../app/entities/feedback/interview"
import { interview as InterviewPrisma } from "@prisma/client"

export function PrismaToDomain(interviewPrisma: InterviewPrisma): InterviewDomain {
    const interview = new InterviewDomain({ 
        id: interviewPrisma.id,
    });

    return interview;
}

export function DomainToPrisma(interviewDomain: InterviewDomain): InterviewPrisma {
    return {
        id: interviewDomain.id ?? -1,
    }
}