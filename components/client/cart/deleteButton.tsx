"use client";

import { X } from "lucide-react";
import { deleteCartItem } from "@/app/action/cartActions";
import { toast } from "sonner";

interface DeleteCartItemButtonProps {
  cartId: number;
  productId: number;
}

export default function DeleteButton({
  cartId,
  productId,
}: DeleteCartItemButtonProps) {
  const handleDelete = async () => {
    const response = await deleteCartItem(cartId, productId);
    if (response.success)
      toast.success(`${response.product?.name} a bien été supprimé du panier.`);
  };

  return (
    <X
      className="hover:scale-105 text-gray-500 hover:text-red-500"
      onClick={() => handleDelete()}
    />
  );
}
