"use client";

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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/"}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-37.5">
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.id}>
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
              <Link href={"/profile"}>Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        {user?.role === "ADMIN" && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={"/admin"}>Admin</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
