import { getUserId } from "@/app/action/userActions";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//Get CartItems by Cart ID

export async function GET() {
  try {
    const user = await getUserId();
    const cart = await prisma.cart.findFirst({
      where: user.type === "user" ? { userId: user.id } : { guestId: user.id },
    });
    const response = await prisma.cartItem.findMany({
      where: {
        cartId: cart?.id,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Add or Update a product in CartItem

export async function POST(req: Request) {
  try {
    const user = await getUserId();
    const { productId, productCount } = await req.json();
    const cart = await prisma.cart.findFirst({
      where: user.type === "user" ? { userId: user.id } : { guestId: user.id },
    });
    if (!cart) return NextResponse.json("Pas de cart");
    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: {
          increment: productCount,
        },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity: productCount,
      },
    });
    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json(error);
  }
}
