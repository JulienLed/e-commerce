import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Prisma } from "@/generated/prisma/client";

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { Category: true };
}>;

export function ShowProduct({ data }: { data: ProductWithCategory[] }) {
  return (
    <div>
      <Card>
        <CardHeader>{data[0].Category.name}</CardHeader>
        <CardContent className="grid grid-cols-5 gap-2">
          {data.map((product) => {
            return (
              <Card key={product.id} className="min-w-10 max-w-[200px]">
                <CardContent>
                  <div className="flex flex-col items-center gap-2">
                    <h3>{product.name}</h3>
                    <Image
                      alt={`Image of ${product.name}`}
                      src={product.image || ""}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                    <p className="text-sm">{product.description}</p>
                    <p>{product.price / 100} €</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
