import { User } from "../entities/user"; 

interface IUserInfra {
    id: string;
    name: string;
    email: string;
}

export function UserAppToInfra(user: User): IUserInfra {
    return {
        id: user.id ?? "",
        name: user.name,
        email: user.email,
    }
}