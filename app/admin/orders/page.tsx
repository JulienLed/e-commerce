import { getAllOrders } from "@/app/action/orderActions";
import OrderButton from "@/components/client/dashboard/OrderButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Order from "@/components/server/Order";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sortBy: string; order: string }>;
}) {
  const { sortBy, order } = await searchParams;
  const orders = await getAllOrders(sortBy, order);
  const keys = Object.entries(orders[0]).map(([key]) => key);
  const headKeys = keys.filter((key) => {
    return (
      key === "userId" ||
      key === "shippingName" ||
      key === "shippingSurname" ||
      key === "shippingEmail" ||
      key === "status"
    );
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Les commandes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headKeys.map((key, index) => (
                <TableHead key={index}>
                  <OrderButton UrlParams={key} />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{order.shippingName}</TableCell>
                  <TableCell>{order.shippingSurname}</TableCell>
                  <TableCell>{order.shippingEmail}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
