import { FieldValidation } from "../../../utils/validation/field-validation";
import { AppError } from "../../../infra/http/errors/app-error";
import { NewsletterSubscription } from "../../entities/newsletter-subscription";
import { NewsletterSubscriptionRepository } from "../../repositories/newsletter-subscription-repository";

export class SubscribeToNewsletterUsecase {
    constructor(private newsletterSubscriptionRepository: NewsletterSubscriptionRepository) {}

    validateEmail(input: string): boolean {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
        return input.match(validRegex) != null;
    }
      
    async execute(email: string) {
        var emailValidation: any = new FieldValidation(email, "email");
        emailValidation.checkNull();
        emailValidation.checkString();

        emailValidation = this.validateEmail(email);

        if (!emailValidation) {
            throw new AppError("email not valid", 400);
        }

        const alreadySubscribed = await this.newsletterSubscriptionRepository.findByEmail(email);

        if (alreadySubscribed) {
            throw new AppError("you are already subscribed", 400);
        }

        var newsletterSubscription = new NewsletterSubscription(email);

        newsletterSubscription = await this.newsletterSubscriptionRepository.save(newsletterSubscription);

        return {
            newsletterSubscription
        }
    }
}