"use server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const createStripeSession = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            OrderItem: {
                include: {
                    Product: true
                }
            }
        }
    });
  const stripeSession = await stripe.checkout.sessions.create({
    metadata: {
      orderId: orderId.toString(),
    },
    line_items: ,
  });
};
