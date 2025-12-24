"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateStockProduct } from "@/app/_action/productActions";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Product } from "@prisma/client";

export default function ModifyStockInput({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const stock = product?.stock;
  const [stockInput, setStockInput] = useState(stock);
  const handleOnClick = () => {
    startTransition(async () => {
      if (product && stock) {
        const updateProduct = await updateStockProduct(product.id, stockInput);
        updateProduct
          ? toast.message(
              `Stock de ${product.name} bien adapté à ${stockInput}`
            )
          : toast("Erreur dans l'adaptation du stock");
      } else {
        toast("Pas de produit disponible");
      }
    });
  };
  return (
    <div className="flex flac-col gap-1">
      <Input
        type="number"
        value={stockInput}
        onChange={(e) => setStockInput(Number(e.target.value))}
        disabled={isPending}
      />
      <Button onClick={() => handleOnClick()} disabled={isPending}>
        Valider
      </Button>
    </div>
  );
}
