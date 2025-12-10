"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { CartDialog } from "@/components/client/header/CartDialog";

export default function RightMenu({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();

  return (
    <div className="flex flex-col items-center">
      <CartDialog children={children} />
      {status === "authenticated" ? (
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center">
            <Image
              alt="user-img"
              src={data.user?.image || ""}
              width={30}
              height={30}
            />
            <p>{data.user?.name}</p>
          </div>
          <Button onClick={() => signOut()}>Se déconnecter</Button>
        </div>
      ) : (
        <div className="flex justify-center p-2">
          <Button onClick={() => signIn()}>Se connecter</Button>
        </div>
      )}
    </div>
  );
}
