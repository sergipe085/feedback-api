import stripe from ".";

interface ICreateCostumerDTO {
    email: string;
    name: string;
}
export async function createCostumer({ email, name }: ICreateCostumerDTO): Promise<IStripeCostumer> {
    const newCostumer = await stripe.customers.create({
        email,
        name
    });

    return newCostumer as IStripeCostumer;
}

interface ICardInformations {
    type: "card",
    card: {
        number: string,
        exp_month: number,
        exp_year: number,
        cvc: string
    }
}
export async function createCard({ type, card }: ICardInformations): Promise<IStripePaymentMethod> {
    const newPaymentMethod = await stripe.paymentMethods.create({
        type,
        card
    });

    return newPaymentMethod as IStripePaymentMethod;
}

export async function attachPaymentMethod(paymentMethodId: string, costumerId: string) {
    await stripe.paymentMethods.attach(
        paymentMethodId,
        {
            customer: costumerId
        }
    );
}

export async function detachPaymentmethod(paymentMethodId: string) {
    await stripe.paymentMethods.detach(
        paymentMethodId
    );
}

export async function clearPaymentMethods(customerId: string) {
    const paymentMethods = await stripe.customers.listPaymentMethods(
        customerId,
        {
            type: 'card'
        }
    );

    paymentMethods.data.forEach(async (element) => {
        detachPaymentmethod(element.id)
    });
}

export async function createSubscription(
    costumerId: string, 
    priceId: string, 
    paymentMethodId: string,
    metadata: {
        subscription_level: number,
        user: number,
        procecced: boolean
    }
    ) {
    const subscription = await stripe.subscriptions.create({
        customer: costumerId,
        items: [
            {
                price: priceId
            },
        ],
        default_payment_method: paymentMethodId,
        metadata
    });
}

export async function getSubscription(id: string): Promise<IStripeSubscription> {
    const subscription = await stripe.subscriptions.retrieve(id);
    return subscription as IStripeSubscription;
}

export async function updateSubscriptionMetadata({ id, metadata }: IStripeSubscription): Promise<IStripeSubscription> {
    const subscription = await stripe.subscriptions.update(id, {
        metadata
    });
    return subscription as IStripeSubscription;
}

export async function cancelSubscription(id: string): Promise<void> {
    const subscription = await stripe.subscriptions.del(id);
}

export async function createCheckoutSession(price_id: string, costumerId: string, userId: number, subscription_level: number) {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: price_id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `http://127.0.0.1:5500/front-test/success.html`,
        cancel_url: `http://127.0.0.1:5500/front-test/cancel.html`,
        customer: costumerId,
        subscription_data: {
            metadata: {
                user: userId,
                subscription_level: subscription_level
            }
        }
    });

    return session;
}


interface IStripeCostumer {
    id: string;
    email: string;
    payment_method: string;
}

interface IStripePaymentMethod {
    id: string;
    type: string;
}

interface IStripeSubscription {
    id: string;
    metadata: {
        subscription_level: number,
        user: number,
        procecced: string
    };
}