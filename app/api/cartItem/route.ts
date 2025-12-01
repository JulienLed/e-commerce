import {
  findCartByUser,
  getCartItems,
  createCartItem,
  updateCartItem,
} from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { NextResponse } from "next/server";
import { auth } from "@/src/auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = await getUserId();
    const cart = await findCartByUser(userId);
    const response = await getCartItems(cart!.id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    const cart = await findCartByUser(userId);
    const data = await req.json();
    const { productId, productCount } = data;
    const response = await createCartItem(cart!.id, productId, productCount);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await getUserId();
    const cart = await findCartByUser(userId);
    const data = await req.json();
    const { productId, productCount } = data;
    const response = await updateCartItem(cart!.id, productId);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
