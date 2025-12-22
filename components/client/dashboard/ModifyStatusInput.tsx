"use client";

import { updateStatus } from "@/app/action/orderActions";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Order, OrderStatus } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";

export default function ModifyStatusInput({ order }: { order: Order }) {
  const [statusInput, setStatusInput] = useState<OrderStatus>(order.status);
  const status = Object.values(OrderStatus);

  const handleOnClick = async () => {
    const response = await updateStatus(order.id, statusInput);
    if (response.status === statusInput) {
      toast.message(
        `Status ${response.status} bien appliqué à la commande ${order.id}`
      );
    } else {
      toast.error(
        `Status ${response.status} pas appliqué à la commande ${order.id}`
      );
    }
  };

  return (
    <div className="flex gap-2">
      <NativeSelect
        defaultValue={statusInput}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setStatusInput(e.target.value as OrderStatus);
        }}
      >
        {status.map((item) => {
          return (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          );
        })}
      </NativeSelect>
      {statusInput != order.status && (
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleAlert size={20} color="orange" />
          </TooltipTrigger>
          <TooltipContent>Le status a été modifié</TooltipContent>
        </Tooltip>
      )}
      <div
        className="border-border bg-foreground text-accent rounded-lg p-2 hover:bg-accent-foreground hover:cursor-pointer"
        onClick={(e) => {
          handleOnClick();
          e.stopPropagation();
        }}
      >
        Valider
      </div>
    </div>
  );
}
