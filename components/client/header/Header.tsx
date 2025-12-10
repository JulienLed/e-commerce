import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import RightMenu from "./RightMenu";
import Menu from "./MiddleMenu";
import { Cart } from "@/components/server/Cart";

export default function Header() {
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
          <RightMenu children={<Cart />} />
        </SessionProvider>
      </section>
    </div>
  );
}
