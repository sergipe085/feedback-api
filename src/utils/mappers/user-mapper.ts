import { User as UserDomain } from "../../app/entities/user"
import { user as UserPrisma } from "@prisma/client"

export function PrismaToDomain(userPrisma: UserPrisma): UserDomain {
    const user = new UserDomain({ 
        id: userPrisma.id,
        name: userPrisma.name,
        email: userPrisma.email,
        password: userPrisma.password
    });

    return user;
}

export function DomainToPrisma(userDomain: UserDomain): UserPrisma {
    return {
        id: userDomain.id ?? "",
        email: userDomain.email,
        name: userDomain.name,
        password: userDomain.password_hash,
    }
}