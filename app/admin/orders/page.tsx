import { getAllOrders } from "@/app/_action/orderActions";
import OrderButton from "@/components/client/dashboard/OrderButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Order from "@/components/server/Order";
import ModifyStatusInput from "@/components/client/dashboard/ModifyStatusInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Suspense } from "react";
import Loading from "./loading";

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
        <section
          id="header"
          className="grid grid-cols-[20%_17%_17%_17%_30%] w-full text-center"
        >
          {headKeys.map((key, index) => (
            <div key={index}>
              <OrderButton UrlParams={key} />
            </div>
          ))}
        </section>
        <Suspense fallback={<Loading />}>
          <Accordion type="single" collapsible>
            {orders.map((order) => {
              return (
                <AccordionItem key={order.id} value={`order - ${order.id}`}>
                  <AccordionTrigger>
                    <section
                      id="body"
                      className="grid grid-cols-[20%_17%_17%_17%_30%] w-full text-center"
                    >
                      <div className="overflow-scroll">{order.userId}</div>
                      <div>{order.shippingName}</div>
                      <div>{order.shippingSurname}</div>
                      <div>{order.shippingEmail}</div>
                      <div>
                        <ModifyStatusInput order={order} />
                      </div>
                    </section>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Order order={order} />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Suspense>
      </CardContent>
    </Card>
  );
}
