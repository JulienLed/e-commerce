import { prisma } from "@/lib/prisma";
import { getUserId } from "@/app/action/userId";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default async function Cart() {
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
  if (!cart || cart.CartItem.length < 1)
    return <Card>Pas de produits dans le panier</Card>;
  const handleTotalPrice = () => {
    let total = 0;
    for (let index = 0; index < cart?.CartItem.length; index++) {
      total += cart.CartItem[index].Product.price / 100;
    }
    return total;
  };

  return (
    <Card>
      <CardTitle className="px-2">Votre Panier</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Quantitée</TableHead>
              <TableHead>Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.CartItem.map((item) => {
              return (
                <TableRow>
                  <TableCell>
                    <Image
                      alt={item.Product.name}
                      src={item.Product.image || ""}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{item.Product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{`${item.Product.price / 100} €`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>{`${handleTotalPrice()} €`}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
