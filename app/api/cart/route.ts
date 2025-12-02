import { NextResponse } from "next/server";
import { getUserId } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

//Find a Cart by User

export async function GET() {
  try {
    const userId = await getUserId();
    const response = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}

//Create a Cart by User

export async function POST() {
  try {
    const userId = await getUserId();
    if (userId) {
      const response = await prisma.cart.create({
        data: {
          userId,
        },
      });
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ error: "userId et undefined" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
