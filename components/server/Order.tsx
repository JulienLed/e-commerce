import { Card, CardContent } from "../ui/card";
import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
} from "../ui/table";
import Image from "next/image";
import { OrderWithDetails } from "@/app/_action/orderActions";

export default async function Order({ order }: { order: OrderWithDetails }) {
  return (
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
  );
}
