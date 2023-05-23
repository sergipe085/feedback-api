import { Question } from "../../../../app/entities/feedback/question"
import { QuestionRepository } from "../../../../app/repositories/question-repository"
import { DomainToPrisma, PrismaToDomain } from "../../../../utils/mappers/question-mapper";
import prisma from "..";

export class PrismaQuestionRepository extends QuestionRepository {
    findById(id: string): Promise<Question> {
        throw new Error("Method not implemented.");
    }
    async save(question: Question): Promise<Question> {
        const newQuestion = await prisma.question.create({
            data: {
                content: question.content,
            }
        })

        return PrismaToDomain(newQuestion);
    }

    async update(question: Question): Promise<Question> {
        const questionUpdated = await prisma.question.update({
            where: {
                id: question.id
            },
            data: DomainToPrisma(question)
        });

        return PrismaToDomain(questionUpdated);
    }

    async findAll(): Promise<Question[]> {
        var questions = await prisma.question.findMany();
        var _questions = questions.map(f => PrismaToDomain(f))
        return _questions;
    }
}