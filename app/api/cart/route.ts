import { NextResponse } from "next/server";
import { getUserId } from "@/lib/utils";
import { findCartByUser, createCart } from "@/lib/prisma";
import { auth } from "@/src/auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = await getUserId();
    const response = await findCartByUser(userId);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST() {
  try {
    const userId = await getUserId();
    const response = await createCart(userId);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
