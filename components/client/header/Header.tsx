import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import RightMenu from "./RightMenu";
import Menu from "./MiddleMenu";
import { Cart } from "@/components/server/Cart";
import { numOfproducts } from "@/app/action/cartActions";

export default async function Header() {
  const products = await numOfproducts();

  return (
    <div className="grid grid-cols-[10%_80%_10%] py-2">
      <Image alt="logo" src={"/globe.svg"} width={75} height={75}></Image>
      <section id="menu" className="m-auto">
        <Menu />
      </section>
      <section
        id="log-in-info"
        className="flex flex-col items-center border-l-2"
      >
        <SessionProvider>
          <RightMenu cart={<Cart />} products={products} />
        </SessionProvider>
      </section>
    </div>
  );
}
