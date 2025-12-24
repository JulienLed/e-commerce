"use client";

import { deleteCategory } from "@/app/_action/categoryActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function DeleteCategory({ categoryId }: { categoryId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOnClick = () => {
    startTransition(async () => {
      const { data } = await deleteCategory(categoryId);
      data
        ? toast.message(`La catégorie ${data.name} a bien supprimée`)
        : toast.error(
            "Erreur lors de la supression de la catégorie. Veillez d'abors effacfer les produits"
          );
      router.refresh();
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={isPending}>
        <div className="flex gap-2 hover:text-red-500">
          <X />
          <span>
            {isPending ? "En cours de suppression" : "Supprimer la Catégorie"}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Supprimer la catégorie ?</DialogTitle>
        <section id="section-btn" className="flex justify-evenly pt-2">
          <Button
            onClick={() => {
              handleOnClick();
              setOpen(false);
            }}
          >
            Supprimer
          </Button>
          <DialogClose asChild>
            <Button onClick={() => setOpen(false)}>Annuler</Button>
          </DialogClose>
        </section>
      </DialogContent>
    </Dialog>
  );
}
