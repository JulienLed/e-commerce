import { NextResponse } from "next/server";
import { findCartByUser } from "@/lib/prisma";

export async function GET(userId: string) {
  try {
    const response = await findCartByUser(userId);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
