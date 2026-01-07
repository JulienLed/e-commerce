import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import RightMenu from "./RightMenu";
import MiddelMenu from "./MiddleMenu";
import Search from "./Search";
import { Cart } from "@/components/server/Cart";
import { numOfproducts } from "@/app/_action/cartActions";
import { getUserInfos } from "@/app/_action/userActions";
import { getAllCategories } from "@/app/_action/categoryActions";

export default async function Header() {
  const products = await numOfproducts();
  const user = await getUserInfos();
  const categories = await getAllCategories();

  return (
    <div className="grid grid-cols-[10%_auto_20%_10%] items-center py-2">
      <section id="logo" className="justify-self-center">
        <Image alt="logo" src={"/globe.svg"} width={50} height={50} />
      </section>
      <section id="menu" className="m-auto">
        <MiddelMenu user={user} categories={categories} />
      </section>
      <section id="search">
        <Search />
      </section>
      <section
        id="log-in-info"
        className="flex flex-col items-center border-l-2"
      >
        <SessionProvider>
          <RightMenu cart={<Cart />} products={products} user={user} />
        </SessionProvider>
      </section>
    </div>
  );
}
