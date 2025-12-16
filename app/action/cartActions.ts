"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./userActions";
import { revalidatePath } from "next/cache";

//Get Cart by User or Guest ID
export const getCartByUserId = async () => {
  const user = await getUserId();
  const cart = await prisma.cart.findUnique({
    where: user.type === "guest" ? { guestId: user.id } : { userId: user.id },
    include: {
      CartItem: {
        orderBy: {
          productId: "asc",
        },
        include: {
          Product: true,
        },
      },
    },
  });
  return cart;
};

//Delete cartItem by productId and cartId
export const deleteCartItem = async (cartId: number, productId: number) => {
  await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
  });
  revalidatePath("/");
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  return { success: true, product };
};

//Add product to cart
export const addproductToCart = async (productId: number, quantity: number) => {
  const user = await getUserId();
  const productToAdd = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!productToAdd || productToAdd?.stock - quantity < 0)
    return { success: false, message: "No stock left" };
  const cart = await prisma.cart.upsert({
    where: user.type === "guest" ? { guestId: user.id } : { userId: user.id },
    update: {},
    create: user.type === "guest" ? { guestId: user.id } : { userId: user.id },
  });
  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  revalidatePath("/");
  return { success: true, product };
};

//Modify quantity of product into cart
export const modifyQuantity = async (productId: number, quantity: number) => {
  const cart = await getCartByUserId();
  if (!cart) return { success: false, message: "Pas de cart" };
  if (quantity === 0) {
    await deleteCartItem(cart.id, productId);
  } else {
    await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: {
        quantity,
      },
    });
  }

  revalidatePath("/");
};

//Get number of products
export const numOfproducts = async () => {
  const cart = await getCartByUserId();
  if (!cart) return 0;
  const products = await prisma.cartItem.aggregate({
    where: {
      cartId: cart.id,
    },
    _sum: {
      quantity: true,
    },
  });
  return products._sum.quantity || 0;
};
