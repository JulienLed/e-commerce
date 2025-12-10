import { cookies } from "next/headers";
import { auth } from "@/src/auth";
import { prisma } from "@/lib/prisma";

export const mergeCart = async () => {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;
  if (!guestId)
    return {
      success: false,
      message: "Pas de guestId dans les cookies",
    };
  const session = await auth();
  if (!session?.user?.id)
    return {
      success: false,
      message: "Pas de user enregistré",
    };
  const guestCart = await prisma.cart.findUnique({
    where: {
      guestId,
    },
    include: {
      CartItem: {
        include: {
          Product: true,
        },
      },
    },
  });
  if (!guestCart) {
    cookieStore.delete("guestId");
    return {
      success: false,
      message: "Panier guest vide. Cookie effacé",
    };
  }
  const userCart = await prisma.cart.upsert({
    where: {
      userId: session.user.id,
    },
    update: {},
    create: {
      userId: session.user.id,
    },
  });
  for (const guestItem of guestCart.CartItem) {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId: guestItem.productId,
        },
      },
      update: {
        quantity: {
          increment: guestItem.quantity,
        },
      },
      create: {
        cartId: userCart.id,
        productId: guestItem.productId,
        quantity: guestItem.quantity,
      },
    });
  }
  await prisma.cartItem.deleteMany({
    where: {
      cartId: guestCart.id,
    },
  });
  await prisma.cart.delete({
    where: {
      guestId,
    },
  });
  cookieStore.delete("guestId");
  return {
    success: true,
    message: "Merge réussi et guestCart effacé de la db",
  };
};
