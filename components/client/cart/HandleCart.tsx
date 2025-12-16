"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { addproductToCart } from "@/app/action/cartActions";

interface HandleCartProps {
  productId: number;
}

export default function HandleCart({ productId }: HandleCartProps) {
  const [count, setCount] = useState(0);

  const handleCartUpdate = async () => {
    const response = await addproductToCart(productId, count);
    if (response.success) {
      const product = response.product;
      setCount(0);
      toast.success(`${product?.name} a bien été ajouté dans le panier`);
    } else {
      setCount(0);
      toast.error("Plus de produits en stock");
    }
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      <Input
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="text-center w-[50%]"
      />
      <div id="countBtn" className="flex justify-evenly w-full">
        <Button onClick={() => setCount((prev) => prev + 1)}>+</Button>
        <Button
          onClick={() => setCount((prev) => (prev < 1 ? prev : prev - 1))}
        >
          -
        </Button>
      </div>

      <Button onClick={() => handleCartUpdate()}>Ajouter au panier</Button>
    </div>
  );
}
