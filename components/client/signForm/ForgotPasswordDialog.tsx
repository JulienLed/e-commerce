"use client";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { resendForgotPassword } from "@/app/_action/resendAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgotPasswordDialog({ token }: { token: string }) {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const handleOnClick = () => {
    startTransition(async () => {
      const response = await resendForgotPassword(email, token);
      response.success
        ? toast.message("Mail bien envoyé")
        : toast.error("Il y a eu une erreur");
      setOpen(false);
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>Mot de passe oublié ?</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Veuillez introduire votre adresse email</DialogTitle>
        </DialogHeader>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <Button onClick={() => handleOnClick()} disabled={isPending}>
          {isPending ? "Envoit..." : "Envoyer"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
