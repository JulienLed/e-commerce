import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

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
      await prisma?.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "PAID",
          stripePaymentIntentId: session.payment_intent as string,
        },
      });
    }
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    return new NextResponse("Webhook, handler failed", { status: 500 });
  }
}
