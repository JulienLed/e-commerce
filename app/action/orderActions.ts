"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./userActions";
import { getCartByUserId } from "./cartActions";
import { addressSchema } from "@/lib/schema";
import { FormData } from "@/lib/schema";

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
