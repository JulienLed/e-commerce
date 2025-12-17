"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Package, ShoppingCart, Users, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function NavBarAdmin() {
  const pathname = usePathname();

  const items = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Stock", url: "/admin/stock", icon: Package },
    { title: "Commandes", url: "/admin/orders", icon: ShoppingCart },
    { title: "Utilisateurs", url: "/admin/users", icon: Users },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Panneau d'Administration</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
