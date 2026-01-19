"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { resetPassword } from "@/app/_action/userActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPassword({ token }: { token: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleOnClick = () => {
    startTransition(async () => {
      const response = await resetPassword(token, newPassword);
      response.success
        ? toast.message(response.message)
        : toast.error(response.message);
      router.push("/signIn");
    });
  };
  return (
    <Card>
      <CardHeader>Réinitialisation de votre mot de passe</CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-2">
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isPending}
          />
          <Button onClick={() => handleOnClick()} disabled={isPending}>
            {isPending ? "Validation..." : "Valider"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
