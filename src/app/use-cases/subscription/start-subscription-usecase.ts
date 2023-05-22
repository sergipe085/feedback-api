import { UserRepository } from "../../repositories/user-repository";
import { User } from "../../entities/user";
import { attachPaymentMethod, clearPaymentMethods, createCard, createCheckoutSession, createCostumer, createSubscription, detachPaymentmethod } from "../../../infra/services/stripe/stripe";
import { AppError } from "../../../infra/http/errors/app-error";

interface IStartSubscriptionUseCaseProps {
    user: User,
    subscription_level: 1 | 2 | 3;
}


const subscription_stripe_mapper = [
    process.env.SUBSCRIPTION_0_PRICE_ID || "price_1MgXscKYNxpt6pvxIFjDn8eV",
]

export class StartSubscriptionUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ user, subscription_level }: IStartSubscriptionUseCaseProps) {
        const alreadySubscribed = user.subscription_level != 0 && user.subscription_level != undefined;

        if (alreadySubscribed) {
            throw new AppError("user already subscribed", 400);
        }

        const price_id = subscription_stripe_mapper[subscription_level - 1];

        const hasCostumer = user.stripe_customer_id != "NULL" && user.stripe_customer_id != undefined;

        if (hasCostumer == false) {
            const newStripeCostumer = await createCostumer({
                name: user.nickname,
                email: user.email
            });

            user.stripe_customer_id = newStripeCostumer.id;

            await this.userRepository.update(user);
        }

        const session = await createCheckoutSession(
            price_id, 
            user.stripe_customer_id, 
            user.id ?? -1, 
            subscription_level
        );

        return {
            session_url: session.url
        }
    }
}