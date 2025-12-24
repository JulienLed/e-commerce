"use client";

import { updateNameProduct } from "@/app/_action/productActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function ModifyNameInput({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [productName, setProductName] = useState(product.name);
  const handleOnClick = () => {
    startTransition(async () => {
      const response = await updateNameProduct(product.id, productName);
      response.name === productName
        ? toast.message(`Le produit a bien été renommé en ${response.name}`)
        : toast.error(
            "Il y a eu une erreur dans le changement de nom du produit"
          );
      router.refresh();
    });
  };
  return (
    <div className="flex gap-2">
      <Input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        disabled={isPending}
      />
      <Button onClick={() => handleOnClick()} disabled={isPending}>
        Valider
      </Button>
    </div>
  );
}
