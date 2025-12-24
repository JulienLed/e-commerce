"use client";

import { Input } from "@/components/ui/input";
import { modifyQuantity } from "@/app/_action/cartActions";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ModifyQuantityInputProps {
  productId: number;
  quantity: number;
}

export default function ModifyQuantityInput({
  productId,
  quantity,
}: ModifyQuantityInputProps) {
  const [count, setCount] = useState(quantity);
  const [isPending, startTransition] = useTransition();

  const handleOnClick = () => {
    startTransition(async () => {
      await modifyQuantity(productId, count);
      toast.success("Quantité modifiée");
    });
  };
  return (
    <div className="flex gap-2">
      <Input
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-20! text-center"
      />
      <Button onClick={() => handleOnClick()} disabled={isPending}>
        Ok
      </Button>
    </div>
  );
}
