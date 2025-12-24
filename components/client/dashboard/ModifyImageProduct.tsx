"use client";

import { updateImageUrlProduct } from "@/app/_action/productActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function ModifyImageProduct({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [newUrl, setNewUrl] = useState<string>(product.image || "");

  const handleOnClick = () => {
    startTransition(async () => {
      const response = await updateImageUrlProduct(product.id, newUrl);
      response.success
        ? toast.message(`L'url de l'image a bien été changée`)
        : toast.error(response.message);
      setOpen(false);
      router.refresh();
    });
  };
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild disabled={isPending}>
          <div className="hover:cursor-pointer">
            <Image
              alt={product.name}
              src={product.image || ""}
              width={100}
              height={100}
              className="rounded-md"
            />
            <span
              className="absolute top-0 bg-primary-foreground rounded-lg p-1 transition-all duration-200 ease-in-out"
              style={isHover ? { opacity: 1 } : { opacity: 0.3 }}
            >
              {isPending ? "Modification" : "Modifier"}
            </span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Modifier l'url de l'Image</DialogTitle>
          <section id="input">
            <Input
              value={newUrl || ""}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </section>
          <section id="btn">
            <Button onClick={() => handleOnClick()}>Enregistrer</Button>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Annuler
              </Button>
            </DialogClose>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
}
