import { PrismaClient } from "@/generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

/*******************************************************/
//Product

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
//Cart

//Find a Cart by User

export const findCartByUser = async (userId: string) => {
  const response = await prisma.cart.findFirst({
    where: {
      userId,
    },
  });
  return response;
};

//Create Cart By User
export const createCart = async (userId: string) => {
  const response = await prisma.cart.create({
    data: {
      userId,
    },
  });
  return response;
};

/*******************************************************/
//CartItem

//Get CartItems by Cart ID
export const getCartItems = async (cartId: number) => {
  const response = await prisma.cartItem.findMany({
    where: {
      cartId: cartId,
    },
  });
  return response;
};

//Create CartItem
export const createCartItem = async (
  cartId: number,
  productId: number,
  productCount: number
) => {
  const response = await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity: productCount,
    },
  });
  return response;
};

//Update CartItem By CartId

export const updateCartItem = async (
  cartItemId: number,
  productCount: number
) => {
  const response = await prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity: productCount,
    },
  });
};
