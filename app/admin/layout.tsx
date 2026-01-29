import { redirect } from "next/navigation";
import { getUserInfos } from "../_action/userActions";
import NavBarAdmin from "@/components/client/dashboard/NavBarAdmin";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import NavBarAdminMini from "@/components/client/dashboard/NavBarAdminMini";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfos = await getUserInfos();
  if (userInfos?.role !== "ADMIN") {
    redirect("/");
  } else {
    return (
      <SidebarProvider>
        <NavBarAdmin />
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
        <footer className="fixed bottom-0 -ml-5 mr-5 flex md:hidden">
          <NavBarAdminMini />
        </footer>
      </SidebarProvider>
    );
  }
}
