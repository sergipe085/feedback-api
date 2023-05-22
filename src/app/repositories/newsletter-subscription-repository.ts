import { NewsletterSubscription } from "@entities/newsletter-subscription";

export abstract class NewsletterSubscriptionRepository {
    abstract save(newsletterSubscription: NewsletterSubscription): Promise<NewsletterSubscription>;
    abstract findByEmail(email: string): Promise<NewsletterSubscription | null>;
    abstract findAll(): Promise<NewsletterSubscription[]>;
}