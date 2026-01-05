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
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const handleOnSubmit = () => {
    startTransition(async () => {
      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
      });
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Connection..." : "Se connecter"}
          </Button>
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
