"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import { useState } from "react";
import { ProfilFormData } from "@/lib/schema";

export default function UserProfile({ user }: { user: User }) {
  const [formData, setFormData] = useState<ProfilFormData>({
    name: user.name || "",
    email: user.email || "",
    newPassword: "",
    newPasswordConfirm: "",
    imgURL: user.image || "",
    role: user.role || "",
  });
  //METTRE SERVEUR ACTIONS
  return (
    <form className="flex flex-col gap-2">
      <section id="name" className="flex flex-col gap-2">
        <Label htmlFor="name-input">Nom : </Label>
        <Input
          id="name-input"
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
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
        />
      </section>
      <section id="role" className="flex flex-col gap-2">
        <Label htmlFor="role-input">ROLE : </Label>
        <Input id="role-input" type="text" value={formData.role} disabled />
      </section>
    </form>
  );
}
