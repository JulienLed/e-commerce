"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isPending, startTransition] = useTransition();
  const handleOnSubmit = () => {
    startTransition(async () => {
      //créer et ajouter la serveur action qui valide les champs et créer l'user.
    });
  };
  return (
    <div className="flex flex-col items-center">
      <section id="credentials">
        <form onSubmit={handleOnSubmit}>
          <section id="email-input">
            <Label htmlFor="email">Email: </Label>
            <Input
              id="email"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </section>
          <section id="pasword-input">
            <Label htmlFor="password">Mot de Passe: </Label>
            <Input
              id="password"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </section>
          <Button type="submit"></Button>
        </form>
      </section>
      <section id="google">
        <Button
          id="google-button"
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          Se connecter avec Google
        </Button>
      </section>
    </div>
  );
}
