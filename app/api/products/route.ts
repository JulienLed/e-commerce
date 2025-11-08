import { NextResponse } from "next/server";
import { getProducts } from "@/lib/prisma";

export const GET = async () => {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.log("Erreur en back avec products : " + error);
  }
};
