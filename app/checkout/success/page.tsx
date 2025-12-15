import { getOrderByOrderId } from "@/app/action/orderActions";
import { getUserId } from "@/app/action/userActions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { SearchParams } from "next/dist/server/request/search-params";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  const orderIdString = (await searchParams).orderId;
  const orderId = parseInt(orderIdString);
  const order = await getOrderByOrderId(orderId);

  const user = await getUserId();
  if (user.id != order?.userId) redirect("/");

  return (
    <Card>
      <CardContent>
        <h2 className="py-2">Payement accepté !</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p>{`Commande créée le ${order.createdAt.getDate()} / ${
                order.createdAt.getMonth() + 1
              } / ${order.createdAt.getFullYear()}`}</p>
              <p>{`Status de la commande: ${order.status}`}</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={1}></TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Prix unitaire</TableHead>
                  <TableHead>Prix total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.OrderItem.map((item) => {
                  return (
                    <TableRow key={item.id} className="h-20!">
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
                      <TableCell>{item.quantity}</TableCell>
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
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell>{`${order.totalAmount / 100} €`}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
