import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type tParams = Promise<{ product: string }>;

export async function GET(req: NextRequest, { params }: { params: tParams }) {
  try {
    const { product } = await params;
    const data = await prisma.product.findMany({
      where: {
        Category: {
          name: product,
        },
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
