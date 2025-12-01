"use client";

import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import AuthInfos from "./AuthInfos";
import Menu from "./menu/menu";
import ModeToggle from "../dark-mode";

export default function Header() {
  return (
    <div className="grid grid-cols-[10%_80%_10%]">
      <Image alt="logo" src={"/globe.svg"} width={75} height={75}></Image>
      <section id="menu" className="m-auto">
        <Menu />
      </section>
      <section
        id="log-in-info"
        className="flex flex-col items-center border-l-2"
      >
        <SessionProvider>
          <ModeToggle />
          <AuthInfos />
        </SessionProvider>
      </section>
    </div>
  );
}
