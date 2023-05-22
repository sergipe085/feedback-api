import { NewsletterSubscription } from "../../../../app/entities/newsletter-subscription";
import { NewsletterSubscriptionRepository } from "../../../../app/repositories/newsletter-subscription-repository";
import prisma from "..";

export class PrismaSubscriptionRepository extends NewsletterSubscriptionRepository {
    async save(newsletterSubscription: NewsletterSubscription): Promise<NewsletterSubscription> {
        const sub = await prisma.nEWSLETTER_SUBSCRIPTIONS.create({
            data: {
                email: newsletterSubscription.email
            }
        })

        return sub;
    }

    async findAll(): Promise<NewsletterSubscription[]> {
        const subs = await prisma.nEWSLETTER_SUBSCRIPTIONS.findMany();
        return subs;
    }

    async findByEmail(email: string): Promise<NewsletterSubscription | null> {
        const sub = await prisma.nEWSLETTER_SUBSCRIPTIONS.findFirst({
            where: {
                email
            }
        })

        return sub;
    }
}