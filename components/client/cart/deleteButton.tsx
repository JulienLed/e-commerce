"use client";

import { X } from "lucide-react";
import { deleteCartItem } from "@/app/action/cartActions";

interface DeleteCartItemButtonProps {
  cartId: number;
  productId: number;
}

export default function DeleteButton({
  cartId,
  productId,
}: DeleteCartItemButtonProps) {
  return (
    <X
      className="hover:scale-105 text-gray-500 hover:text-red-500"
      onClick={() => deleteCartItem(cartId, productId)}
    />
  );
}
