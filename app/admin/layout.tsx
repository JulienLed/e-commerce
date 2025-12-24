import { redirect } from "next/navigation";
import { getUserInfos } from "../_action/userActions";
import NavBarAdmin from "@/components/client/dashboard/NavBarAdmin";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfos = await getUserInfos();
  if (userInfos?.role === "USER") {
    redirect("/");
  } else {
    return (
      <SidebarProvider>
        <NavBarAdmin />
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }
}
