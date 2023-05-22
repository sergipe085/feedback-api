import { User, User as UserDomain } from "../../app/entities/user"
import { PLAYERS_DATA as UserPrisma } from "@prisma/client"

export function PrismaToDomain(userPrisma: UserPrisma): UserDomain {
    const user = new UserDomain({ 
        nickname: userPrisma.Nickname,
        email: userPrisma.Email,
        password: userPrisma.Password
    });

    user.created_at = userPrisma.CreationDate;
    user.gemmes = userPrisma.Gemmes;
    user.salt = userPrisma.Salt;
    user.id = userPrisma.Id;
    user.stripe_customer_id = userPrisma.StripeCostumerId;
    user.subscription_level = userPrisma.SubscriptionLevel;

    return user;
}

export function DomainToPrisma(userDomain: UserDomain): UserPrisma {
    return {
        Id: userDomain.id ?? -1 as number,
        Email: userDomain.email,
        CreationDate: userDomain.created_at,
        Gemmes: userDomain.gemmes,
        Nickname: userDomain.nickname,
        Password: userDomain.password_hash,
        Salt: userDomain.salt,
        StripeCostumerId: userDomain.stripe_customer_id,
        SubscriptionLevel: Number(userDomain.subscription_level)
    }
}