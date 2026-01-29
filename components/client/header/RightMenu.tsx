"use client";

import { signOut } from "next-auth/react";
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
  handleOnClick,
}: {
  cart: React.ReactNode;
  products: number;
  user: User | null;
  handleOnClick?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <div>
      {user ? (
        <div className="flex flex-col gap-2 p-2">
          <div className="flex md:justify-evenly md:gap-2 items-center">
            {user?.image && (
              <Image
                alt="user-img"
                src={user?.image}
                width={30}
                height={30}
                className="rounded-md"
              />
            )}
            <p className="text-sm md:text-lg text-fuchsia-950 font-bold">
              {user?.name}
            </p>
            <p className="text-sm md:text-lg text-fuchsia-950 font-bold">
              {user?.surname}
            </p>
          </div>
          <Button
            className="w-fit"
            onClick={() => {
              signOut();
              handleOnClick?.(false);
              router.push("/");
            }}
          >
            Se déconnecter
          </Button>
        </div>
      ) : (
        <div className="flex w-fit md:justify-center p-2">
          <Button onClick={() => handleOnClick?.(false)}>
            <Link href={"/signIn"}>Se connecter</Link>
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-2 md:grid md:grid-cols-[70%_20%] p-2">
        <Button onClick={() => handleOnClick?.(false)} className="w-fit">
          <Link href={"/orders"}>Commandes</Link>
        </Button>
        <div className="flex justify-start md:justify-center">
          <CartDialog
            cart={cart}
            products={products}
            handleOnClick={handleOnClick}
          />
        </div>
      </div>
    </div>
  );
}
