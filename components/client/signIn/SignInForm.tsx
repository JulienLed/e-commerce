"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

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
  const router = useRouter();
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (response.error) {
        toast.error("Il y a eu une erreur");
      } else {
        toast.message("Utilisateur bien connecté");
        router.push("/");
        router.refresh();
      }
    });
  };
  return (
    <div className="flex flex-col items-center">
      <section id="credentials">
        <form onSubmit={(e) => handleOnSubmit(e)}>
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
