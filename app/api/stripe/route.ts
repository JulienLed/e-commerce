import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { sendOrderConfirmationEMail } from "@/app/_action/resendAction";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse("Webhook error", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = parseInt(session?.metadata?.orderId!);
      const orderItems = await prisma?.orderItem.findMany({
        where: {
          orderId,
        },
        include: {
          Product: true,
        },
      });
      await prisma?.$transaction(async (tx) => {
        await tx.order.update({
          where: {
            id: orderId,
          },
          data: {
            status: "PAID",
            stripePaymentIntentId: session.payment_intent as string,
          },
        });
        if (!orderItems || orderItems.length < 1)
          return new NextResponse("No products in order", { status: 404 });
        for (let item of orderItems) {
          await tx.product.update({
            where: {
              id: item.Product.id,
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }
      });
      const emailResult = await sendOrderConfirmationEMail(orderId);

      if (!emailResult.success) {
        console.error(
          "⚠️ Email non envoyé, mais paiement validé:",
          emailResult.error
        );
      }
    }
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log("L'erreru du catch : " + error);
    return new NextResponse("Webhook, handler failed", { status: 500 });
  }
}
