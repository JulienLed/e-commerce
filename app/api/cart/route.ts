import { NextResponse } from "next/server";
import { getUserId } from "@/app/action/userId";
import { prisma } from "@/lib/prisma";

//Find a Cart by User

export async function GET() {
  try {
    const user = await getUserId();
    const cart = await prisma.cart.findFirst({
      where: user.type === "user" ? { userId: user.id } : { guestId: user.id },
      include: {
        CartItem: {
          include: {
            Product: true,
          },
        },
      },
    });
    return NextResponse.json(cart);
    // }
  } catch (error) {
    return NextResponse.json(error);
  }
}

//Create a Cart by User

export async function POST() {
  try {
    const user = await getUserId();
    const cart = await prisma.cart.create({
      data: user.type === "user" ? { userId: user.id } : { guestId: user.id },
    });
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(error);
  }
}
