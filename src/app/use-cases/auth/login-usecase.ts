import { User } from "../../entities/user";
import { compareSync } from "bcrypt";
import { FieldValidation } from "../../../utils/validation/field-validation";
import { AppError } from "../../../infra/http/errors/app-error";
import { sign } from "jsonwebtoken";
import { UserAppToInfra } from "../../mappers/user_app_mapper";
import { UserRepository } from "../../repositories/user-repository";

interface ILoginUseCaseProps {
    email: string;
    password: string;
}

export class LoginUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ email, password }: ILoginUseCaseProps) {
        const emailValidation = new FieldValidation(email, "email");
        emailValidation.checkNull();
        emailValidation.checkString();

        const passwordValidation = new FieldValidation(password, "password");
        passwordValidation.checkNull();
        passwordValidation.checkString();
        passwordValidation.checkLength(6);

        var user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("user does not exists", 404);
        }

        const passwordMatch = compareSync(password, user.password_hash);

        if (!passwordMatch) {
            throw new AppError("user does not exists", 404);
        }

        console.log("LOGIN USER")
        console.log(user)

        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET ?? "");

        return {
            user: UserAppToInfra(user),
            token
        }
    }
}