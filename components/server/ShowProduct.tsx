import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Prisma } from "@/generated/prisma/client";
import HandleCart from "../client/cart/HandleCart";
import Link from "next/link";

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { Category: true };
}>;

export function ShowProduct({ data }: { data: ProductWithCategory[] }) {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>{data[0].Category.name}</CardHeader>
        <CardContent className="grid grid-cols-5 gap-2">
          {data.map((product) => {
            return (
              <Card
                key={product.id}
                className="min-w-10 max-w-50 flex flex-col"
              >
                <CardContent className="flex-1 flex flex-col items-center gap-2 px-1">
                  <h3>{product.name}</h3>
                  <Link href={`/${data[0].Category.name}/${product.id}`}>
                    <Image
                      alt={`Image of ${product.name}`}
                      src={product.image || ""}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </Link>
                  <p className="text-sm text-center">{product.description}</p>
                  <p>{product.price / 100} €</p>
                </CardContent>
                <div className="p-4 pt-0">
                  <HandleCart productId={product.id} />
                </div>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
