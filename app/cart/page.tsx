import { prisma } from "@/lib/prisma";
import { getUserId } from "../action/userId";
import { Card, CardContent } from "@/components/ui/card";

export default async function Cart() {
  const user = await getUserId();
  let cart;
  if (user.type === "guest") {
    cart = await prisma.cart.findFirst({
      where: {
        guestId: user.id,
      },
    });
  } else if (user.type === "user") {
    cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
    });
  }
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart?.id,
    },
  });

  return (
    <Card>
      <CardContent>
        <p>{`User type : ${user.type}`}</p>
        <p>{`User Id : ${user.id}`}</p>
        <p>{`Cart Id : ${cart?.id}`}</p>
        <div>
          {cartItems.map((cartItem) => (
            <p
              key={cartItem.id}
            >{`Cart Item ProductId : ${cartItem.productId} / Quantity : ${cartItem.quantity}`}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
