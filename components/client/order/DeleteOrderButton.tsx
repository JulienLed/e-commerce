"use client";

import { deleteOrder } from "@/app/action/orderActions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DeleteOrderButton({ orderId }: { orderId: number }) {
  const handleDeleteOrder = async () => {
    const response = await deleteOrder(orderId);
    if (!response || !response.success) {
      toast.error("Erreur lors de la suppression de la comande.");
    } else {
      toast.message("Commande bien supprimée");
    }
  };
  return (
    <Button onClick={() => handleDeleteOrder()}>Supprimer la commande</Button>
  );
}
