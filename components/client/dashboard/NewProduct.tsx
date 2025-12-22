"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormDataCreateProduct } from "@/lib/schema";
import { createProduct } from "@/app/action/productActions";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function NewProduct({ categoryId }: { categoryId: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newProduct, setNewproduct] = useState<FormDataCreateProduct>({
    name: "",
    description: "",
    price: "",
    stock: 0,
    image: "",
    categoryId,
  });
  const handleOnClick = async () => {
    const response = await createProduct(newProduct);
    response
      ? toast.message(`${response.name} a bien été créé`)
      : toast.error("Erreur lors de la création du produit.");
    setNewproduct({
      name: "",
      description: "",
      price: "",
      stock: 0,
      image: "",
      categoryId,
    });
    router.refresh();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Ajouter un nouveau produit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Nouveau produit</DialogTitle>
        <div>
          <section id="section-name" className="py-1">
            <Label htmlFor="name" className="pb-2">
              Nom
            </Label>
            <Input
              id="name"
              type="text"
              value={newProduct?.name}
              onChange={(e) =>
                setNewproduct((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </section>
          <section id="section-description" className="py-1">
            <Label htmlFor="description" className="pb-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewproduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </section>
          <section id="section-price" className="py-1">
            <Label htmlFor="price" className="pb-2">
              Prix
            </Label>
            <div className="flex gap-2">
              <Input
                id="price"
                type="string"
                placeholder="2999 pour 29,99€"
                value={newProduct.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    setNewproduct((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }));
                  }
                }}
              />
              <Tooltip>
                <TooltipTrigger>
                  <Info size={10} />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="border-2 bg-accent p-2 rounded-lg">
                    Mettre le prix en centimes
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
          </section>
          <section id="section-stock" className="py-1">
            <Label htmlFor="stock" className="pb-2">
              Stock
            </Label>
            <Input
              id="stock"
              type="string"
              value={newProduct.stock}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d+$/.test(value)) {
                  setNewproduct((prev) => ({
                    ...prev,
                    stock: Number(e.target.value),
                  }));
                }
              }}
            />
          </section>
          <section id="section-image" className="py-1">
            <Label htmlFor="image" className="pb-2">
              URL de l'image
            </Label>
            <Input
              id="image"
              type="text"
              value={newProduct.image}
              onChange={(e) =>
                setNewproduct((prev) => ({ ...prev, image: e.target.value }))
              }
            />
          </section>
          <section id="section-btn" className="flex justify-evenly pt-5">
            <Button id="btnValidation" onClick={() => handleOnClick()}>
              Enregistrer
            </Button>
            <DialogClose asChild>
              <Button
                id="btnClose"
                onClick={() => {
                  setNewproduct({
                    name: "",
                    description: "",
                    price: "",
                    stock: 0,
                    image: "",
                    categoryId,
                  });
                  setOpen(false);
                }}
              >
                Annuler
              </Button>
            </DialogClose>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
