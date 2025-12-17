"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePriceProduct } from "@/app/action/productAction";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "@prisma/client";

export default function ModifyStockInput({ product }: { product: Product }) {
  const price = product?.price;
  const [priceInput, setpriceInput] = useState(price);
  const handleOnClick = async () => {
    if (product && price) {
      const updateProduct = await updatePriceProduct(product.id, priceInput);
      updateProduct
        ? toast.message(
            `Prix de ${product.name} bien adapté à ${priceInput} cents`
          )
        : toast("Erreur dans l'adaptation du prix");
    } else {
      toast("Pas de produit disponible");
    }
  };
  return (
    <div className="flex flac-col gap-1">
      <Input
        type="number"
        value={priceInput}
        onChange={(e) => setpriceInput(Number(e.target.value))}
      />
      <Button onClick={() => handleOnClick()}>Valider</Button>
    </div>
  );
}
