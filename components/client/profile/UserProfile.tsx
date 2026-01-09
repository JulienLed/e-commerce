"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import { useState, useEffect, useTransition } from "react";
import { ProfilFormData } from "@/lib/schema";
import { updateUserInfo } from "@/app/_action/userActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfile({ user }: { user: User }) {
  const [formData, setFormData] = useState<ProfilFormData>({
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    newPassword: "",
    newPasswordConfirm: "",
    address: user.address || "",
    imgURL: user.image || "",
    role: user.role || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [queryAddress, setQueryAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (queryAddress.length < 3) return;
    const timer = setTimeout(async () => {
      console.log("INPUT : " + queryAddress);
      const results = await fetch("/api/googlePlaces", {
        method: "POST",
        body: JSON.stringify({ queryAddress }),
      });
      const { places } = await results.json();
      console.log(JSON.stringify(places));
      setSuggestions(places);
    }, 500);
    return () => clearTimeout(timer);
  }, [queryAddress]);

  const router = useRouter();
  const { data: session, update } = useSession();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    startTransition(async () => {
      const response = await updateUserInfo(formData);
      if (!response.success && response.errors) {
        setErrors(response.errors);
        toast.error(response.data);
        router.refresh();
      } else {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            image: formData.imgURL,
          },
        });
        toast.message(response.data);
        router.refresh();
      }
    });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
      <section id="name" className="flex flex-col gap-2">
        <Label htmlFor="name-input">Nom : </Label>
        <Input
          id="name-input"
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={isPending}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </section>
      <section id="surname" className="flex flex-col gap-2">
        <Label htmlFor="surname-input">Prénom : </Label>
        <Input
          id="surname-input"
          type="text"
          value={formData.surname}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, surname: e.target.value }))
          }
          disabled={isPending}
        />
        {errors.surname && (
          <span className="text-red-500">{errors.surname}</span>
        )}
      </section>
      <section id="address" className="relative flex flex-col gap-2">
        <Label htmlFor="address-input">Adresse : </Label>
        <Input
          id="address-input"
          type="text"
          value={formData.address}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, address: e.target.value }));
            setQueryAddress(e.target.value);
          }}
          disabled={isPending}
        />
        {errors.address && (
          <span className="text-red-500">{errors.address}</span>
        )}
        {suggestions.length > 0 && (
          <Card className="absolute top-full left-0 w-full">
            <CardContent className="flex flex-col gap-1 overflow-y-auto h-20">
              {suggestions.map(
                (suggestion: { formattedAddress: string }, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-md border-2 hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        address: suggestion.formattedAddress,
                      }));
                      setSuggestions([]);
                    }}
                  >
                    <span>{suggestion.formattedAddress}</span>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        )}
      </section>
      <section id="email" className="flex flex-col gap-2">
        <Label htmlFor="email-input">Email : </Label>
        <Input
          id="email-input"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          disabled={isPending}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </section>
      <section id="password" className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="password-input">Nouveau Mot de Passe : </Label>
          <Input
            id="password-input"
            type="password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            disabled={isPending}
          />
          {errors.newPassword && (
            <span className="text-red-500">{errors.newPassword}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password-conf-input">
            Confirmation Nouveau mot de Passe :{" "}
          </Label>
          <Input
            id="password-conf-input"
            type="password"
            value={formData.newPasswordConfirm}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                newPasswordConfirm: e.target.value,
              }))
            }
            disabled={isPending}
          />
        </div>
      </section>
      <section id="image" className="flex flex-col gap-2">
        <Label htmlFor="img-url-input">URL Image Profile : </Label>
        <Input
          id="img-url-input"
          type="text"
          value={formData.imgURL}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, imgURL: e.target.value }))
          }
          disabled={isPending}
        />
        {errors.imgURL && <span className="text-red-500">{errors.imgURL}</span>}
      </section>
      <section id="role" className="flex flex-col gap-2">
        <Label htmlFor="role-input">ROLE : </Label>
        <Input id="role-input" type="text" value={formData.role} disabled />
      </section>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}
