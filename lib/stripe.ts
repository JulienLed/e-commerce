import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET!
    : process.env.STRIPE_PUBLIC!,
  {
    apiVersion: "2025-11-17.clover",
  }
);
