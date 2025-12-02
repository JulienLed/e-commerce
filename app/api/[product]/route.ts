import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export default async function GET(
  req: Request,
  {
    params,
  }: {
    params: { product: string };
  }
) {
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
