import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const menus = [
  {
    title: "E-Cigarettes",
    path: "/E-Cigarette",
  },
  {
    title: "E-Liquids",
    path: "/E-Liquid",
  },
  {
    title: "Coils",
    path: "/Coil",
  },
];

export default function Menu() {
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
          <NavigationMenuContent className="min-w-[150px]">
            <ul>
              {menus.map((menu) => {
                return (
                  <li key={menu.path}>
                    <NavigationMenuLink asChild>
                      <Link href={menu.path}>{menu.title}</Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
