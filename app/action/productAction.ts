"use server";

import { prisma } from "@/lib/prisma";

export const getProduct = async (productId: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Category: true,
    },
  });
  return product;
};
