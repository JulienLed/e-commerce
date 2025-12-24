"use client";

import { X } from "lucide-react";
import { deleteCartItem } from "@/app/_action/cartActions";
import { toast } from "sonner";
import { useTransition } from "react";

interface DeleteCartItemButtonProps {
  cartId: number;
  productId: number;
}

export default function DeleteButton({
  cartId,
  productId,
}: DeleteCartItemButtonProps) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteCartItem(cartId, productId);
      if (response.success)
        toast.success(
          `${response.product?.name} a bien été supprimé du panier.`
        );
    });
  };

  return (
    <button onClick={() => handleDelete()} disabled={isPending}>
      <X className="hover:scale-105 text-gray-500 hover:text-red-500" />
    </button>
  );
}
