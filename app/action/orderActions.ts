"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./userActions";
import { getCartByUserId } from "./cartActions";
import { addressSchema } from "@/lib/schema";
import { FormData } from "@/lib/schema";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

//Create an order and delete cart
export const createOrder = async (formData: FormData) => {
  const result = addressSchema.safeParse(formData);
  if (!result) return { success: false, message: "Données invalides" };
  const { name, surname, street, numStreet, postalCode, city, email } =
    formData;
  const user = await getUserId();
  const cart = await getCartByUserId();
  if (!cart) return { success: false, message: "Pas de cart valide" };
  let totalAmount = 0;
  for (let i = 0; i < cart.CartItem.length; i++) {
    totalAmount += cart.CartItem[i].quantity * cart.CartItem[i].Product.price;
  }
  try {
    const order = await prisma.$transaction(async (trans) => {
      const newOrder = await trans.order.create({
        data: {
          userId: user.type === "user" ? user.id : null,
          guestEmail: user.type === "guest" ? formData.email : null,
          shippingName: name,
          shippingSurname: surname,
          shippingStreet: street,
          shippingNumStreet: numStreet,
          shippingPostalCode: postalCode,
          shippingCity: city,
          shippingEmail: email,
          totalAmount,
          OrderItem: {
            create: cart.CartItem.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.Product.price,
            })),
          },
        },
        include: {
          OrderItem: true,
        },
      });
      await trans.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
      return newOrder;
    });
    return { success: true, orderId: order.id, totalAmount };
  } catch (error) {
    return { success: false, message: `Erreur dans la transaction: ${error}` };
  }
};

//Get Order By OrderId
export const getOrderByOrderId = async (orderId: number) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      OrderItem: {
        include: {
          Product: true,
        },
      },
    },
  });
  return order;
};

//Get all orders for a userId
export const getAllOrdersByuserId = async () => {
  const user = await getUserId();
  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      OrderItem: {
        include: {
          Product: true,
        },
      },
    },
  });
  return orders;
};

//Delete Order
export const deleteOrder = async (orderId: number) => {
  const validDelOrderItem = await prisma.orderItem.deleteMany({
    where: {
      orderId,
    },
  });
  const validDelOrder = await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
  revalidatePath("/order");
  return validDelOrderItem
    ? { success: true, message: `${orderId} bien supprimé` }
    : { success: false, message: `${orderId} pas supprimé` };
};

//Type for Order
export type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    OrderItem: {
      include: {
        Product: true;
      };
    };
  };
}>;
