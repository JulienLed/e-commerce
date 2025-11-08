"use server";

import Link from "next/link";
import ModeToggle from "./dark-mode";
import { Button } from "./ui/button";
import { stackServerApp } from "@/stack/server";

export default async function Header() {
  const user = await stackServerApp.getUser();

  return (
    <div className="w-full h-[15vh] mx-auto p-2 border-b-3 grid grid-cols-3">
      <div className="flex justify-center gap-2 col-start-2 self-center">
        <Button aria-label="Accueil">
          <Link href="/">Accueil</Link>
        </Button>
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-2 col-start-3 justify-self-end self-center">
        {user ? (
          <div>
            <p>{user.displayName}</p>
            <p>Compte</p>
          </div>
        ) : (
          <>
            <Button>
              <Link href={"/sign-in"}>Connection</Link>
            </Button>
            <Button>
              <Link href={"/sign-up"}>Création de compte</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
