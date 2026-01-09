"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { GoogleLogo } from "./GoogleLogo";
import { SignFormData } from "@/lib/schema";
import { signUp } from "@/app/_action/userActions";

type SignFormProps = "signIn" | "signUp";

export default function SignForm({ mode }: { mode: SignFormProps }) {
  const [formData, setFormData] = useState<SignFormData>({
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      //Si SignIn
      if (mode === "signIn") {
        const response = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (response.error) {
          toast.error("Il y a eu une erreur");
          setIsError(true);
        } else {
          toast.message("Utilisateur bien connecté");
          router.push("/");
          router.refresh();
        }
        //Si Sign Up
      } else if (mode === "signUp") {
        const user = await signUp(formData);
        if (user) {
          const response = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });
          if (response.error) {
            toast.error("Il y a eu une erreur");
            setIsError(true);
          } else {
            toast.message("Utilisateur bien enregistré et connecté");
            router.push("/");
            router.refresh();
          }
        } else {
          toast.error("Il y a eu une erreur");
          setIsError(true);
        }
      }
    });
  };

  const handleOnClick = () => {
    startTransition(async () => {
      //const response = await forgotPassword() et un comportement pour envoyer un mail, etc...
    });
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <section id="credentials" className="flex flex-col items-center">
        <form
          onSubmit={(e) => handleOnSubmit(e)}
          className="flex flex-col gap-2"
        >
          <section id="email-input" className="flex flex-col gap-2">
            <Label htmlFor="email">Email: </Label>
            <Input
              id="email"
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                setIsError(false);
              }}
              onClick={() => {
                if (isError) {
                  setFormData((prev) => ({ ...prev, email: "" }));
                  setIsError(false);
                }
              }}
              value={formData.email}
              style={isError ? { color: "red" } : { color: "black" }}
            />
          </section>
          <section id="pasword-input">
            <Label htmlFor="password">Mot de Passe: </Label>
            <Input
              id="password"
              type="password"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              onClick={() => {
                if (isError) {
                  setFormData((prev) => ({ ...prev, password: "" }));
                  setIsError(false);
                }
              }}
              value={formData.password}
            />
          </section>
          <Button type="submit" disabled={isPending}>
            {mode === "signIn"
              ? isPending
                ? "Connection..."
                : "Se connecter"
              : isPending
                ? "Création..."
                : "Créer un compte"}
          </Button>
        </form>
        {mode === "signIn" && (
          <div className="flex ">
            <Link href={"/signUp"}>
              <span className="text-sm">Pas de compte ?</span>
            </Link>
            <span onClick={() => handleOnClick()}>Mot de passe oublié ?</span>
          </div>
        )}
      </section>
      <section id="divider" className="w-full border-t-2"></section>
      <section id="google">
        <Button
          id="google-button"
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          <div className="flex gap-2">
            <GoogleLogo className="w-10" />
            <span>Se connecter avec Google</span>
          </div>
        </Button>
      </section>
    </div>
  );
}
