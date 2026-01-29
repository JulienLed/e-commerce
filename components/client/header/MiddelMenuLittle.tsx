"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, Category } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import RightMenu from "./RightMenu";
import { Cart } from "@/components/server/Cart";

export default function MiddelMenuLittle({
  user,
  categories,
  products,
  cart,
}: {
  user: User | null;
  categories: Category[];
  products: number;
  cart: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="pl-2">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Link onClick={() => setOpen(false)} href={"/"}>
          Accueil
        </Link>
        <Accordion type="single" collapsible>
          <AccordionItem value="Produits">
            <AccordionTrigger>Produits</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {categories.map((category, id) => {
                return (
                  <Link
                    key={id}
                    onClick={() => setOpen(false)}
                    href={`/${category.name}`}
                  >
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {user && (
          <Link onClick={() => setOpen(false)} href={"/profile"}>
            Profile
          </Link>
        )}
        {user?.role === "ADMIN" && (
          <Link onClick={() => setOpen(false)} href={"/admin"}>
            Admin
          </Link>
        )}
        <RightMenu
          cart={cart}
          products={products}
          user={user}
          handleOnClick={setOpen}
        />
      </SheetContent>
    </Sheet>
  );
}
