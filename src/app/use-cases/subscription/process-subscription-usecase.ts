import { AppError } from "../../../infra/http/errors/app-error";
import { getSubscription, updateSubscriptionMetadata } from "../../../infra/services/stripe/stripe";
import { UserRepository } from "../../repositories/user-repository";

const subscription_gemm_mapper = [
    150
]

export class ProcessSubscriptionUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(subscriptionId: string) {
        const subscription = await getSubscription(subscriptionId);

        if (!subscription) {
            throw new AppError("subscription does not exists", 404);
        }

        const { subscription_level, user: userId } = subscription.metadata;

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError("user does not exists", 404);
        }

        const gemmsToAdd = subscription_gemm_mapper[subscription_level - 1];

        user.gemmes += gemmsToAdd;
        user.subscription_level = subscription_level;

        await this.userRepository.update(user);

        await updateSubscriptionMetadata({
            id: subscription.id,
            metadata: {
                user: subscription.metadata.user,
                subscription_level: subscription.metadata.subscription_level,
                procecced: "true"
            }
        })
    }
}