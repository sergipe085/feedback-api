import { User } from "../../../../app/entities/user"
import { UserRepository } from "../../../../app/repositories/user-repository"
import { DomainToPrisma, PrismaToDomain } from "../../../../utils/mappers/user-mapper";
import prisma from "..";

export class PrismaUserRepository extends UserRepository {
    async findByNickname(nickname: string): Promise<User | null> {
        const user = await prisma.pLAYERS_DATA.findFirst({
            where: {
                Nickname: nickname
            }
        })

        if (!user) {
            return null;
        }

        return PrismaToDomain(user);
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.pLAYERS_DATA.findFirst({
            where: {
                Email: email
            }
        })

        if (!user) {
            return null;
        }

        return PrismaToDomain(user);
    }

    async findById(id: number): Promise<User | null> {
        const user = await prisma.pLAYERS_DATA.findFirst({
            where: {
                Id: Number(id)
            }
        })

        if (!user) {
            return null;
        }

        return PrismaToDomain(user);
    }
    async save(user: User): Promise<User> {
        const newUser = await prisma.pLAYERS_DATA.create({
            data: {
                CreationDate: new Date(),
                Email: user.email,
                Gemmes: user.gemmes,
                Nickname: user.nickname,
                Password: user.password_hash,
                Salt: user.salt
            }
        })

        return PrismaToDomain(newUser);
    }

    async update(user: User): Promise<User> {
        const userUpdated = await prisma.pLAYERS_DATA.update({
            where: {
                Email: user.email
            },
            data: DomainToPrisma(user)
        });

        return PrismaToDomain(userUpdated);
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}