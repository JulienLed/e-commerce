"use client";

import { getProductsByString } from "@/app/_action/productActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { ProductWithCategory } from "@/lib/schema";

export default function Search() {
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState<string>("");
  const [products, setProducts] = useState<ProductWithCategory[]>([]);

  useEffect(() => {
    const fetchProducts = () => {
      startTransition(async () => {
        const products = await getProductsByString(searchInput);
        setProducts(products);
      });
    };
    if (searchInput === "") return;
    const timerId = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchInput, startTransition]);

  return (
    <div className="relative w-[70%]">
      <Input
        placeholder="Rechercher..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        disabled={isPending}
      />
      {searchInput && (
        <Card className="absolute w-full h-fit">
          <CardContent>
            {isPending ? (
              <span>Recherche en cours...</span>
            ) : products.length < 1 ? (
              <span>Pas de produits trouvés</span>
            ) : (
              products.map((product) => {
                return (
                  <Link
                    key={product.id}
                    href={`/${product.Category.name}/${product.id}`}
                    onClick={() => {
                      setSearchInput("");
                      setProducts([]);
                    }}
                  >
                    <div className="grid grid-cols-[20%_60%_20%] py-1 text-center">
                      <Image
                        alt={product.name}
                        src={product.image || ""}
                        width={30}
                        height={30}
                      />
                      <span>{product.name}</span>
                      <span>{`${product.price / 100} €`}</span>
                    </div>
                  </Link>
                );
              })
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
