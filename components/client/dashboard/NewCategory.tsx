"use client";

import { createCategory } from "@/app/_action/categoryActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function NewCategory() {
  const [isPending, startTransition] = useTransition();
  const rooter = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const handleOnClick = () => {
    startTransition(async () => {
      const response = await createCategory(newCategory);
      response
        ? toast.message(`Catégorie ${response.name} a bien été créée`)
        : toast.error("Erreur lors de la création de la catégorie");
      rooter.refresh();
      setOpen(false);
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={isPending}>
          <Plus />
          <span>
            {isPending
              ? "Création nouvelle catégorie..."
              : "Nouvelle Catégorie"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ajouter une nouvelle catérogie</DialogTitle>
        <div>
          <section id="section-name">
            <Label htmlFor="name" className="pb-2">
              Nom de la catégorie
            </Label>
            <Input
              id="name"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </section>
          <section id="section-btn" className="flex justify-evenly pt-5">
            <Button onClick={() => handleOnClick()}>Enregistrer</Button>
            <DialogClose asChild>
              <Button onClick={() => setOpen(false)}>Annuler</Button>
            </DialogClose>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
