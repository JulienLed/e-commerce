"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Category, User } from "@prisma/client";
import Link from "next/link";

export default function MiddelMenu({
  user,
  categories,
}: {
  user: User | null;
  categories: Category[];
}) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className="text-2xl! font-semibold!" href={"/"}>
              Accueil
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-2xl! font-semibold! hover:bg-accent! py-6!">
            Produits
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-full!">
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.id} className="text-2xl! font-semibold!">
                    <NavigationMenuLink asChild>
                      <Link href={`/${category.name}`}>
                        {category.name.charAt(0).toUpperCase() +
                          category.name.slice(1)}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {user && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className="text-2xl! font-semibold!" href={"/profile"}>
                Profile
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        {user?.role === "ADMIN" && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className="text-2xl! font-semibold!" href={"/admin"}>
                Admin
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
