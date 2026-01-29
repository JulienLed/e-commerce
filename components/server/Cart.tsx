import { Card, CardContent } from "@/components/ui/card";
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
import { getCartByUserId } from "@/app/_action/cartActions";
import DeleteButton from "../client/cart/DeleteButton";
import ModifyQuantityInput from "../client/cart/ModifyQuantityInput";

export async function Cart() {
  //Get Cart
  const cart = await getCartByUserId();
  if (!cart || cart.CartItem.length < 1)
    return <Card>Pas de produits dans le panier</Card>;

  //Get TotalPrice
  const handleTotalPrice = () => {
    let total = 0;
    for (let index = 0; index < cart?.CartItem.length; index++) {
      const unitPrice = cart.CartItem[index].Product.price;
      const quantity = cart.CartItem[index].quantity;
      total += (unitPrice * quantity) / 100;
    }
    return total.toFixed(2);
  };

  return (
    <>
      <Card className="hidden md:flex">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2}></TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Prix unitaire</TableHead>
                <TableHead>Prix total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.CartItem.map((item) => {
                return (
                  <TableRow key={item.id} className="h-20!">
                    <TableCell>
                      <DeleteButton
                        cartId={cart.id}
                        productId={item.Product.id}
                      />
                    </TableCell>
                    <TableCell>
                      <Image
                        alt={item.Product.name}
                        src={item.Product.image || ""}
                        width={50}
                        height={50}
                        className="object-cover rounded-sm"
                      />
                    </TableCell>
                    <TableCell>{item.Product.name}</TableCell>
                    <TableCell>
                      <ModifyQuantityInput
                        productId={item.productId}
                        quantity={item.quantity}
                      />
                    </TableCell>
                    <TableCell>{`${item.Product.price / 100} €`}</TableCell>
                    <TableCell>{`${
                      (item.Product.price * item.quantity) / 100
                    } €`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell>{`${handleTotalPrice()} €`}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
      {cart.CartItem.map((item) => {
        return (
          <Card key={item.id} className="flex md:hidden">
            <CardContent className="flex gap-2">
              <DeleteButton cartId={cart.id} productId={item.Product.id} />
              <Image
                alt={item.Product.name}
                src={item.Product.image || "/no-image.jpg"}
                width={35}
                height={35}
                className="object-cover rounded-sm"
              />
              <ModifyQuantityInput
                productId={item.productId}
                quantity={item.quantity}
              />
              <p>{`${(item.Product.price * item.quantity) / 100} €`}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
