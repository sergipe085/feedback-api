import { hashSync } from "bcrypt";

interface ICreateUserDTO {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export class User {
    id?: string;
    name: string;
    email: string;
    password_hash: string;

    constructor({ id, name, email, password }: ICreateUserDTO) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password_hash = password;
    }
}