import { getProduct } from "@/app/_action/productActions";
import HandleCart from "@/components/client/cart/HandleCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getProduct(Number(id));
  if (!response.success || !response.data) notFound();
  const product = response.data;
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>{product?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 m-2">
          <Image
            alt={product?.name}
            src={product?.image || "/no-image.jpg"}
            width={400}
            height={400}
          />
          <p>{product.description}</p>
          <HandleCart productId={product.id} />
        </div>
      </CardContent>
    </Card>
  );
}
