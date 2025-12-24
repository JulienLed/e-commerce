import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllOrdersByuserId } from "../_action/orderActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Order from "@/components/server/Order";
import DeleteOrderButton from "@/components/client/order/DeleteOrderButton";

export default async function Page() {
  const orders = await getAllOrdersByuserId();

  return (
    <Card className="w-[90%]">
      <CardHeader>Vos Commandes passées</CardHeader>
      <CardContent>
        <section id="head" className="grid grid-cols-3 w-full text-left">
          <div>Date</div>
          <div>Total</div>
          <div>Status</div>
        </section>
        <Accordion type="single" collapsible>
          {orders.map((order) => {
            return (
              <AccordionItem value={`order-${order.id}`} key={order.id}>
                <AccordionTrigger>
                  <section
                    id="body"
                    className="grid grid-cols-3 w-full text-left"
                  >
                    <p>{`${order.createdAt.getDate()} / ${
                      order.createdAt.getMonth() + 1
                    } / ${order.createdAt.getUTCFullYear()}`}</p>
                    <p>{`${(order.totalAmount / 100).toFixed(2)} €`}</p>
                    <p>{order.status}</p>
                  </section>
                </AccordionTrigger>
                <AccordionContent>
                  <Order order={order} />
                  {order.status === "PENDING" ? (
                    <div className="flex justify-evenly gap-2 m-2">
                      <Button>
                        <Link href={"/checkout"}>Procéder au paiement</Link>
                      </Button>
                      <DeleteOrderButton orderId={order.id} />
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
