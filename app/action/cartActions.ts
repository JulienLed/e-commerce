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
  revalidatePath("/cart");
  return { success: true };
};
