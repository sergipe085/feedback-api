import { AppError } from "../../../infra/http/errors/app-error";
import { UserRepository } from "../../repositories/user-repository";

export class ProcessCancelledSubscriptionUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: number) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError("user does not exists", 404);
        }
        
        user.subscription_level = 0;
        await this.userRepository.update(user);
    }
}