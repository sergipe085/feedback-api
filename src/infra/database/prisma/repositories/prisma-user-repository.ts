import { User } from "../../../../app/entities/user"
import { UserRepository } from "../../../../app/repositories/user-repository"
import { DomainToPrisma, PrismaToDomain } from "../../../../utils/mappers/user-mapper";
import prisma from "..";

export class PrismaUserRepository extends UserRepository {
    async findByNickname(name: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                name: name
            }
        })

        if (!user) {
            return null;
        }

        return PrismaToDomain(user);
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            return null;
        }

        return PrismaToDomain(user);
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (!user) {
            return null;
        }

        return PrismaToDomain(user);
    }
    async save(user: User): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password_hash,
            }
        })

        return PrismaToDomain(newUser);
    }

    async update(user: User): Promise<User> {
        const userUpdated = await prisma.user.update({
            where: {
                id: user.id
            },
            data: DomainToPrisma(user)
        });

        return PrismaToDomain(userUpdated);
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}