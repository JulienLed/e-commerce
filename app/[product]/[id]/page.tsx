import { getProduct } from "@/app/action/productAction";
import HandleCart from "@/components/client/cart/HandleCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product)
    return (
      <Card>
        <CardContent>Pas de produit</CardContent>
      </Card>
    );
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
