"use client";

import { useStackApp } from "@stackframe/stack";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import ModeToggle from "./dark-mode";

export default function UserHeader() {
  const app = useStackApp();
  const user = app.useUser();

  return (
    <div className="w-full h-fit mx-auto p-2 border-b-3 grid grid-cols-3">
      <div className="flex justify-center gap-2 col-start-2 self-center">
        <Button aria-label="Accueil">
          <Link href="/">Accueil</Link>
        </Button>
        <ModeToggle />
      </div>
      <div className="col-start-3 justify-self-end self-center mx-2">
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              {user.profileImageUrl && (
                <Image
                  alt="User profile Image"
                  src={user.profileImageUrl}
                  width={50}
                  height={50}
                />
              )}
              <p>{user.displayName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Button>
                <Link href={`/${user.id}`}>Compte</Link>
              </Button>
              <Button onClick={() => user.signOut()}>Se déconnecter</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <Button>
              <Link href={"/sign-in"}>Connection</Link>
            </Button>
            <Button>
              <Link href={"/sign-up"}>Création de compte</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
