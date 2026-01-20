"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const CartDialog = ({
  cart,
  products,
}: {
  cart: React.ReactNode;
  products: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="relative">
          <ShoppingCart />
          <Badge
            className={cn(
              "absolute top-0 left-5 h-4 w-2 text-[0.7rem]",
              Number(products) > 0 && "bg-green-500 animate-pulse scale-105",
            )}
          >
            {Number(products) < 9 ? Number(products) : "9+"}
          </Badge>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl! max-h-xl!">
        <DialogTitle>Panier</DialogTitle>
        <div className="overflow-y-auto max-h-[90%]">{cart}</div>
        <Button onClick={() => setIsOpen(false)}>
          <Link href={"/cart"}>Voir le panier complet</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
