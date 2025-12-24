"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oups, il n'y a rien ici...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-5">
          <h2>Retourner en terrain connu ?</h2>
          <Button>
            <Link href={"/"}>Page d'accueil</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
