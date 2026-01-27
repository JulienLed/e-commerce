import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Prisma } from "@prisma/client";
import HandleCart from "../client/cart/HandleCart";
import Link from "next/link";

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { Category: true };
}>;

export function ShowProduct({
  products,
  category,
}: {
  products: ProductWithCategory[];
  category: string;
}) {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>{category}</CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {products.length === 0 || !products ? (
            <Card>
              <CardContent>Pas de produits dans cette catégorie</CardContent>
            </Card>
          ) : (
            products.map((product) => {
              return (
                <Card
                  key={product.id}
                  className="min-w-10 max-w-50 flex flex-col justify-self-center"
                >
                  <CardContent className="flex-1 flex flex-col items-center gap-2 px-1">
                    <h3 className="text-sm md:text-base">{product.name}</h3>
                    <Link href={`/${category}/${product.id}`}>
                      <Image
                        alt={`Image of ${product.name}`}
                        src={product.image || ""}
                        width={200}
                        height={200}
                        className="rounded-md"
                      />
                    </Link>
                    <p className="text-sm text-center">{product.description}</p>
                    <p className="text-sm md:text-base">
                      {product.price / 100} €
                    </p>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <HandleCart productId={product.id} />
                  </div>
                </Card>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
