import { Response } from "../../../../app/entities/feedback/response"
import { ResponseRepository } from "../../../../app/repositories/response-repository"
import { DomainToPrisma, PrismaToDomain } from "../../../../utils/mappers/interview-mapper";
import prisma from "..";

export class PrismaResponseRepository extends ResponseRepository {
    async findByQuestionId(questionId: string): Promise<Response[]> {
        const responses = await prisma.response.findMany({
            where: {
                question_id: questionId
            }
        })

        return responses
    }
    async findByInterviewId(interviewId: number): Promise<Response[]> {
        const responses = await prisma.response.findMany({
            where: {
                interview_id: interviewId
            }
        })

        return responses;
    }
    async save(response: Response): Promise<Response> {
        const newResponse = await prisma.response.create({
            data: {
                interview_id: response.interview_id,
                question_id: response.question_id,
                note: response.note,
                obs: response.obs
            }
        });

        return newResponse;
    }

    async findAll(): Promise<Response[]> {
        return []
    }
}