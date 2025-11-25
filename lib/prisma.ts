import { PrismaClient } from "@/generated/prisma/client";

export async function getCoils() {
  const prisma = new PrismaClient();
  const response = await prisma.product.findMany({
    where: {
      categoryId: 3,
    },
  });
  return response;
}
