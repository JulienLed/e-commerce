import { NextResponse } from "next/server";
import { getUserId } from "@/lib/utils";
import { findCartByUser, createCart } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getUserId();
    if (typeof userId === "string") {
      const response = await findCartByUser(userId);
      return NextResponse.json(response);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST() {
  try {
    const userId = await getUserId();
    if (typeof userId === "string") {
      const response = await createCart(userId);
      return NextResponse.json(response);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
