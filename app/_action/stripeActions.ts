"use server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const createStripeSession = async (orderId: number) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          include: {
            Product: true,
          },
        },
      },
    });
    console.log("Le Order : " + order);
    const domain =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_URL
        : "http://localhost:3000";
    const stripeSession = await stripe.checkout.sessions.create({
      metadata: {
        orderId: orderId.toString(),
      },
      line_items: order?.OrderItem.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.Product.name,
            description: item.Product.description || undefined,
            images: item.Product.image ? [item.Product.image] : undefined,
          },
          unit_amount: item.priceAtPurchase,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${domain}/checkout/success?orderId=${orderId}`,
      cancel_url: `${domain}/checkout`,
      customer_email: order?.shippingEmail,
    });
    console.log("SessionURL : " + stripeSession.url);
    return { success: true, sessionUrl: stripeSession.url };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};
