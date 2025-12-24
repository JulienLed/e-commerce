"use client";

import { cancelOrder } from "@/app/_action/orderActions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteOrderButton({ orderId }: { orderId: number }) {
  const [isPending, startTransition] = useTransition();
  const handleDeleteOrder = () => {
    startTransition(async () => {
      const response = await cancelOrder(orderId);
      if (!response || !response.success) {
        toast.error("Erreur lors de la suppression de la comande.");
      } else {
        toast.message("Commande bien supprimée");
      }
    });
  };
  return (
    <Button onClick={() => handleDeleteOrder()} disabled={isPending}>
      {isPending ? "En cours de suppression" : "Supprimer la commande"}
    </Button>
  );
}
