import { Question } from "../../../../app/entities/feedback/question"
import { QuestionRepository } from "../../../../app/repositories/question-repository"
import { DomainToPrisma, PrismaToDomain } from "../../../../utils/mappers/question-mapper";
import prisma from "..";

export class PrismaQuestionRepository extends QuestionRepository {
    async findById(id: string): Promise<Question | null> {
        return prisma.question.findFirst({
            where: {
                id: id ?? ""
            }
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.question.update({
            where: {
                id
            },
            data: {
                deleted_at: new Date()
            }
        })
    }

    async clear(): Promise<void> {
        // const questions = await prisma.question.findMany();
        // for (var i = 0; i < questions.length; i++) {
        //     // await prisma.question.delete({
        //     //     where: {
        //     //         id: questions[i].id
        //     //     }
        //     // })
        // }

        await prisma.question.updateMany({
            data: {
                deleted_at: new Date()
            }
        });
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
        var questions = await prisma.question.findMany({
            where: {
                deleted_at: null
            }
        });
        var _questions = questions.map(f => PrismaToDomain(f))
        return _questions;
    }
}