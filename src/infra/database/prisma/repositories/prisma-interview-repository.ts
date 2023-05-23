import { Interview } from "../../../../app/entities/feedback/interview"
import { InterviewRepository } from "../../../../app/repositories/interview-repository"
import { DomainToPrisma, PrismaToDomain } from "../../../../utils/mappers/interview-mapper";
import prisma from "..";

export class PrismaInterviewRepository extends InterviewRepository {
    async save(interview: Interview): Promise<Interview> {
        const newInterview = await prisma.interview.create({});
        console.log(newInterview)

        return PrismaToDomain(newInterview);
    }

    async findAll(): Promise<Interview[]> {
        var interviews = await prisma.interview.findMany();
        var _interviews = interviews.map(f => PrismaToDomain(f))
        return _interviews;
    }
}