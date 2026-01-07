"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { CartDialog } from "@/components/client/header/CartDialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

export default function RightMenu({
  cart,
  products,
  user,
}: {
  cart: React.ReactNode;
  products: number;
  user: User | null;
}) {
  const router = useRouter();

  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex flex-col gap-2 p-2">
          <div className="flex justify-evenly items-center">
            {user?.image && (
              <Image
                alt="user-img"
                src={user?.image}
                width={30}
                height={30}
                className="rounded-md"
              />
            )}
            <p>{user?.name}</p>
            <p>{user?.surname}</p>
          </div>
          <Button
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Se déconnecter
          </Button>
        </div>
      ) : (
        <div className="flex justify-center p-2">
          <Button>
            <Link href={"/signIn"}>Se connecter</Link>
          </Button>
        </div>
      )}
      <div className="grid grid-cols-[70%_20%] p-2">
        <Button>
          <Link href={"/orders"}>Commandes</Link>
        </Button>
        <div className="flex justify-center">
          <CartDialog cart={cart} products={products} />
        </div>
      </div>
    </div>
  );
}
