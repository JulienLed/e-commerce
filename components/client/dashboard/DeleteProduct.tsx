"use client";

import { deleteProduct } from "@/app/_action/productActions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@prisma/client";
import { X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function DeleteProduct({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const handleOnClick = () => {
    startTransition(async () => {
      await deleteProduct(product.id);
      toast.message(`Le produit a bien été supprimé`);
    });
  };
  return (
    <Dialog>
      <DialogTrigger disabled={isPending}>
        <div className="hover:text-red-500">
          <X size={20} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Supprimer le produit</DialogTitle>
        <div className="flex flex-col gap-2 items-center">
          <p>{`Etes-vous sure de vouloir supprimer ${product.name} ?`}</p>
          <div className="flex gap-2">
            <div
              className="border-border bg-foreground text-accent rounded-lg p-2 hover:bg-accent-foreground hover:cursor-pointer"
              onClick={() => {
                handleOnClick();
                setOpen(false);
              }}
            >
              Oui
            </div>
            <DialogClose>
              <div
                className="border-border bg-foreground text-accent rounded-lg p-2 hover:bg-accent-foreground hover:cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Non
              </div>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
