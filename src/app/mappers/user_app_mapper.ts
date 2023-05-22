import { User } from "../entities/user"; 

interface IUserInfra {
    id: number;
    nickname: string;
    email: string;
    gemmes: number;
    subscription_level: number;
}

export function UserAppToInfra(user: User): IUserInfra {
    return {
        id: user.id ?? -1,
        nickname: user.nickname,
        email: user.email,
        gemmes: user.gemmes,
        subscription_level: user.subscription_level
    }
}