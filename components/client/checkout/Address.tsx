"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { addressSchema } from "@/lib/schema";
import { FormData } from "@/lib/schema";
import { createOrder } from "@/app/_action/orderActions";
import { createStripeSession } from "@/app/_action/stripeActions";
import { toast } from "sonner";
import { User } from "@prisma/client";

export default function Adress({ userInfos }: { userInfos: User | null }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<FormData>({
    name: userInfos?.name ? userInfos.name : "",
    surname: userInfos?.surname ? userInfos.surname : "",
    street: "",
    numStreet: "",
    postalCode: "",
    city: "",
    email: userInfos?.email ? userInfos.email : "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = addressSchema.safeParse(formData);
      const newErrors: Record<string, string> = {};
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          newErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(newErrors);
        return;
      }
      setErrors({});
      const order = await createOrder(formData);
      if (!order.success || !order.orderId) {
        toast.error("Problème avec la création de l'Order");
        return;
      }
      const { sessionUrl, success } = await createStripeSession(order.orderId);
      if (!sessionUrl || !success) {
        toast.error("Erreur lors du paiement");
        return;
      }
      window.location.href = sessionUrl;
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const formItems: Array<{ label: string; id: keyof FormData }> = [
    {
      label: "Nom",
      id: "name",
    },
    {
      label: "Prénom",
      id: "surname",
    },
    {
      label: "Rue",
      id: "street",
    },
    {
      label: "Numéro",
      id: "numStreet",
    },
    {
      label: "Code Postal",
      id: "postalCode",
    },
    {
      label: "Commune",
      id: "city",
    },
    {
      label: "E-Mail",
      id: "email",
    },
  ];

  return (
    <Card className="w-[50%]">
      <CardHeader>
        <CardTitle>Vos informations de contact</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {formItems.map((item) => {
            return (
              <div key={item.id} className="flex flex-col">
                <Label htmlFor={item.id} className="w-[20%] pb-2">
                  {item.label}
                </Label>
                <Input
                  id={item.id}
                  value={formData[item.id]}
                  onChange={(e) => handleOnChange(e)}
                  disabled={isPending}
                />
                {errors[item.id] && (
                  <p className="py-0 text-[0.8rem] text-red-500">
                    {errors[item.id]}
                  </p>
                )}
              </div>
            );
          })}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Envoi..." : "Valider"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
