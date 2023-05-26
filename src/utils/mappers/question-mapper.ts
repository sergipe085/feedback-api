import { Question as QuestionDomain } from "../../app/entities/feedback/question"
import { question as QuestionPrisma } from "@prisma/client"

export function PrismaToDomain(QuestionPrisma: QuestionPrisma): QuestionDomain {
    const question = new QuestionDomain({ 
        id: QuestionPrisma.id,
        content: QuestionPrisma.content,
        created_at: QuestionPrisma.created_at,
        deleted_at: QuestionPrisma.deleted_at
    });

    return question;
}

export function DomainToPrisma(QuestionDomain: QuestionDomain): QuestionPrisma {
    return {
        id: QuestionDomain.id ?? "",
        content: QuestionDomain.content,
        created_at: QuestionDomain.created_at,
        deleted_at: QuestionDomain.deleted_at
    }
}