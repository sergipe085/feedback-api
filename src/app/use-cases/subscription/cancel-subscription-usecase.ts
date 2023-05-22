import { AppError } from "../../../infra/http/errors/app-error";
import { cancelSubscription, getSubscription, updateSubscriptionMetadata } from "../../../infra/services/stripe/stripe";
import { UserRepository } from "../../repositories/user-repository";

export class CanceledSubscriptionUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(subscriptionId: string) {
        await cancelSubscription(subscriptionId);
    }
}