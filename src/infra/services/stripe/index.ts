const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SK_TEST);

export default stripe;