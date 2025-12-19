"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./userActions";
import { getCartByUserId } from "./cartActions";
import { addressSchema } from "@/lib/schema";
import { FormData } from "@/lib/schema";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

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

//Get All Orders
export const getAllOrders = async (sortBy: string, order: string) => {
  const orders = await prisma.order.findMany({
    orderBy: {
      [sortBy]: order,
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

//Get all orders count, order by status
export const getOrdersCountByStatus = async () => {
  const orderByStatus = await prisma.order.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });
  const counts = {
    PENDING: 0,
    PAID: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  };
  orderByStatus.forEach(
    (order) => (counts[order.status] = order._count.status)
  );
  return counts;
};

//Get Sales from orders PAID, SHIPPED and DELIVERED
export const getSales = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: {
        in: ["DELIVERED", "PAID", "SHIPPED"],
      },
    },
  });
  let sales = 0;
  orders.forEach((order) => (sales += order.totalAmount));
  return sales;
};

//Cancel Order
export const cancelOrder = async (orderId: number) => {
  const validCancelOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  revalidatePath("/order");
  return validCancelOrder
    ? { success: true, message: `${orderId} bien annulé` }
    : { success: false, message: `${orderId} pas annulé` };
};

//Update status
export const updateStatus = async (orderId: number, status: OrderStatus) => {
  const orderUpdate = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
  return orderUpdate;
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
