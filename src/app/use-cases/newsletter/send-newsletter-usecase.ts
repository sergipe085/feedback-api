import { NewsletterSubscriptionRepository } from "@repositories/newsletter-subscription-repository";
import { FieldValidation } from "../../../utils/validation/field-validation";
import { sendEmail } from "../../../infra/services/nodemailer/nodemailer"

interface ISendNewsletterUsecaseProps {
    title: string;
    content: string;
}

export class SendNewsletterUsecase {
    constructor(private newsletterSubscriptionRepository: NewsletterSubscriptionRepository) {}

    async execute({ title, content }: ISendNewsletterUsecaseProps) {
        const titleValidation = new FieldValidation(title, "title");
        titleValidation.checkNull();
        titleValidation.checkString();

        const contentValidation = new FieldValidation(content, "content");
        contentValidation.checkNull();
        contentValidation.checkString();
        contentValidation.checkLength(10);
        
        const subscriptions = await this.newsletterSubscriptionRepository.findAll(); 

        subscriptions.forEach(async (subscription) => {
            await sendEmail(subscription.email, title, content);
        })
    }
}