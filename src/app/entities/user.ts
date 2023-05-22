import { hashSync } from "bcrypt";

interface ICreateUserDTO {
    nickname: string;
    email: string;
    password: string;
}

export class User {
    id?: number;
    nickname: string;
    email: string;
    password_hash: string;
    gemmes: number;
    created_at: Date;
    salt: string;
    stripe_customer_id: string;
    subscription_level: number;

    constructor({ nickname, email, password }: ICreateUserDTO) {
        this.nickname = nickname;
        this.email = email;
        this.password_hash = password;

        this.gemmes = 0;
        this.created_at = new Date();
        this.salt = "";
        this.stripe_customer_id = "NULL";
        this.subscription_level = 0;
    }
}