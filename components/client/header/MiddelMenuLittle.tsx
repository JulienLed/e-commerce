import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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

export default function MiddelMenuLittle({
  user,
  categories,
}: {
  user: User | null;
  categories: Category[];
}) {
  return (
    //Problème d'affichage du Menu Icon.
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Link href={"/"}>Accueil</Link>
        <Accordion type="single" collapsible>
          <AccordionItem value="Produits">
            <AccordionTrigger>Produits</AccordionTrigger>
            <AccordionContent>
              {categories.map((category, id) => {
                return (
                  <Link key={id} href={`/${category.name}`}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {user && <Link href={"/profile"}>Profile</Link>}
        {user?.role === "ADMIN" && <Link href={"/admin"}>Admin</Link>}
      </SheetContent>
    </Sheet>
  );
}
