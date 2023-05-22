import { hashSync } from "bcrypt";

interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export class User {
    id?: string;
    name: string;
    email: string;
    password_hash: string;

    constructor({ name, email, password }: ICreateUserDTO) {
        this.name = name;
        this.email = email;
        this.password_hash = password;
    }
}