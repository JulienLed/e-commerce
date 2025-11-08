"use client";
import { useStackApp } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Page() {
  const app = useStackApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-[30%]">
      <CardTitle className="mx-auto">Connectez-vous à votre compte</CardTitle>
      <CardContent>
        <div className="flex flex-col gap-3">
          <section
            id="credentials-auth"
            className="flex flex-col gap-2 items-center"
          >
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              className="w-[10vw]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              type="text"
              id="password"
              className="w-[10vw]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={async () => {
                await app.signInWithCredential({ email, password });
              }}
            >
              Se connecter
            </Button>
          </section>
          <section id="google-auth" className="flex justify-center">
            <Button
              onClick={async () => {
                await app.signInWithOAuth("google");
              }}
            >
              Se connecter avec Google
            </Button>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
