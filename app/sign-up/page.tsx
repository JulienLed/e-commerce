"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useStackApp } from "@stackframe/stack";
import { useState } from "react";

export default function Page() {
  const app = useStackApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className="w-[30%]">
      <CardTitle className="mx-auto">Créer un nouveau compte</CardTitle>
      <CardContent>
        <div className="flex flex-col gap-3">
          <section
            id="credentials-auth"
            className="flex flex-col gap-2 items-center"
          >
            <div>
              <Label htmlFor="email">Adresse email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={async () =>
                await app.signUpWithCredential({ email, password })
              }
            >
              Créer un compte
            </Button>
          </section>
          <div className="w-full border-t-2 h-1"></div>
          <section id="google-auth" className="flex justify-center">
            <Button
              onClick={async () => {
                await app.signInWithOAuth("google");
              }}
            >
              Créer avec Google
            </Button>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
