import { Question as QuestionDomain } from "../../app/entities/feedback/question"
import { question as QuestionPrisma } from "@prisma/client"

export function PrismaToDomain(QuestionPrisma: QuestionPrisma): QuestionDomain {
    const question = new QuestionDomain({ 
        id: QuestionPrisma.id,
        content: QuestionPrisma.content,
    });

    return question;
}

export function DomainToPrisma(QuestionDomain: QuestionDomain): QuestionPrisma {
    return {
        id: QuestionDomain.id ?? "",
        content: QuestionDomain.content,
    }
}