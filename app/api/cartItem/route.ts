import { getUserId } from "@/lib/utils";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//Get CartItems by Cart ID

export async function GET() {
  try {
    const userId = await getUserId();
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
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

// Add a product in CartItem

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });
    const data = await req.json();
    const { productId, productCount } = data;
    if (cart) {
      const response = await prisma.cartItem.create({
        data: {
          cartId: cart?.id,
          productId,
          quantity: productCount,
        },
      });
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ error: "cart est undefined" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

//Update a product in CartItem

export async function PUT(req: Request) {
  try {
    const userId = await getUserId();
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cart?.id,
      },
    });
    const data = await req.json();
    const { productId, productCount } = data;
    const cartItem = cartItems.find(
      (cartItem) => cartItem.productId === productId
    );
    const response = await prisma.cartItem.update({
      where: {
        id: cartItem?.id,
      },
      data: {
        quantity: productCount,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
