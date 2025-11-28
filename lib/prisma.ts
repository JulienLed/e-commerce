import { PrismaClient } from "@/generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

/*******************************************************/
//Get Products by category :

export async function getCoils() {
  const response = await prisma.product.findMany({
    where: {
      categoryId: 3,
    },
  });
  return response;
}

export async function getCigarettes() {
  const response = await prisma.product.findMany({
    where: {
      categoryId: 1,
    },
  });
  return response;
}
export async function getLiquids() {
  const response = await prisma.product.findMany({
    where: {
      categoryId: 2,
    },
  });
  return response;
}

/**************************************************/
//Find a Cart by User

export const findCartByUser = async (userId: string) => {
  const response = await prisma.cart.findFirst({
    where: {
      userId,
    },
  });
  return response;
};

/**************************************************/
//Update Cart By User

export const updateCart = async () => {};
