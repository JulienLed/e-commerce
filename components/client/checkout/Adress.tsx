"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addressSchema } from "@/lib/schema";
import { FormData } from "@/lib/schema";
import { createOrder } from "@/app/action/orderActions";
import { createStripeSession } from "@/app/action/stripeActions";
import { toast } from "sonner";

export default function Adress() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    street: "",
    numStreet: "",
    postalCode: "",
    city: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    createStripeSession(orderId);
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
                ></Input>
                {errors[item.id] && (
                  <p className="py-0 text-[0.8rem] text-red-500">
                    {errors[item.id]}
                  </p>
                )}
              </div>
            );
          })}
          <Button type="submit">Valider</Button>
        </form>
      </CardContent>
    </Card>
  );
}
