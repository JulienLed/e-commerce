"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import { useState, useTransition } from "react";
import { ProfilFormData } from "@/lib/schema";
import { updateUserInfo } from "@/app/_action/userActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session, update } = useSession();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await updateUserInfo(formData);
      if (!response.success) {
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
      </section>
      <section id="address" className="flex flex-col gap-2">
        <Label htmlFor="address-input">Adresse : </Label>
        <Input
          id="address-input"
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
          disabled={isPending}
        />
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
