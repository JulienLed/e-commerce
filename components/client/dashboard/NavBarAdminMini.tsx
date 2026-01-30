import { Card, CardContent } from "@/components/ui/card";
import { Home, Warehouse, ArrowLeftRight, UserRound } from "lucide-react";
import Link from "next/link";

export default function NavBarAdminMini() {
  return (
    <Card>
      <CardContent className="flex w-screen! justify-between">
        <Link href={"/admin"}>
          <Home />
        </Link>
        <Link href={"/admin/stock"}>
          <Warehouse />
        </Link>
        <Link href={"/admin/orders"}>
          <ArrowLeftRight />
        </Link>
        <Link href={"/admin/users"}>
          <UserRound />
        </Link>
      </CardContent>
    </Card>
  );
}
