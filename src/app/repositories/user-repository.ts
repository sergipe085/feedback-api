import { User } from "../entities/user";

export abstract class UserRepository {
    abstract save(user: User): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findByNickname(nickname: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract update(user: User): Promise<User | null>;
}