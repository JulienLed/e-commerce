import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import RightMenu from "./RightMenu";
import MiddelMenu from "./MiddleMenu";
import MiddelMenuLittle from "./MiddelMenuLittle";
import Search from "./Search";
import { Cart } from "@/components/server/Cart";
import { numOfproducts } from "@/app/_action/cartActions";
import { getUserInfos } from "@/app/_action/userActions";
import { getAllCategories } from "@/app/_action/categoryActions";
import Link from "next/link";

export default async function Header() {
  const products = await numOfproducts();
  const user = await getUserInfos();
  const categories = await getAllCategories();

  return (
    <div className="relative grid grid-cols-[auto_1fr_auto_auto] items-center py-2 bg-fuchsia-200/80">
      <section id="logo" className="justify-self-start pl-2">
        <Link href={"/"}>
          <Image alt="logo" src={"/logo.png"} width={100} height={100} />
        </Link>
      </section>
      <section id="menu" className="m-auto col-span-2 md:col-span-1">
        <section id="menu-desktop" className="hidden md:flex">
          <MiddelMenu user={user} categories={categories} />
        </section>
        <section id="menu-smartphone" className="md:hidden">
          <MiddelMenuLittle
            user={user}
            categories={categories}
            products={products}
            cart={<Cart />}
          />
        </section>
      </section>
      <section id="search" className="hidden md:flex justify-self-end">
        <Search />
      </section>
      <section
        id="log-in-info"
        className="hidden md:flex flex-col items-center justify-self-end border-l-2 pl-5 mx-10"
      >
        <SessionProvider>
          <RightMenu cart={<Cart />} products={products} user={user} />
        </SessionProvider>
      </section>
    </div>
  );
}
