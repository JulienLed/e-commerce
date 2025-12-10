"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const CartDialog = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <ShoppingCart />
      </DialogTrigger>
      <DialogContent className="max-w-5xl! max-h-xl!">
        <DialogTitle>Panier</DialogTitle>
        <div className="overflow-y-auto max-h-[90%]">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
