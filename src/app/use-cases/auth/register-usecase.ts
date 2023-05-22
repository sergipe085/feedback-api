import { User } from "../../entities/user";
import { UserRepository } from "@repositories/user-repository";
import { hashSync } from "bcrypt";
import { FieldValidation } from "../../../utils/validation/field-validation";
import { AppError } from "../../../infra/http/errors/app-error";
import { UserAppToInfra } from "../../mappers/user_app_mapper";

interface IRegisterUseCaseProps {
    nickname: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ nickname, email, password }: IRegisterUseCaseProps) {
        const nicknameValidation = new FieldValidation(nickname, "nickname");
        nicknameValidation.checkNull();
        nicknameValidation.checkString();

        const emailValidation = new FieldValidation(email, "email");
        emailValidation.checkNull();
        emailValidation.checkString();

        const passwordValidation = new FieldValidation(password, "password");
        passwordValidation.checkNull();
        passwordValidation.checkString();
        passwordValidation.checkLength(6);

        var userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError("user already exists", 404);
        }

        userExists = await this.userRepository.findByNickname(nickname);

        if (userExists) {
            throw new AppError("user already exists", 404);
        }

        const passwordHash = hashSync(password, 4);

        var newUser = new User({
            nickname,
            email,
            password: passwordHash
        });
    
        newUser = await this.userRepository.save(newUser);

        return {
            user: UserAppToInfra(newUser)
        }
    }
}