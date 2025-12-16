import { redirect } from "next/navigation";
import { getUserInfos } from "../action/userActions";
import { Card, CardContent } from "@/components/ui/card";

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
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }
}
