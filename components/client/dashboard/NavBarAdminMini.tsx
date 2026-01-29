import { Card, CardContent } from "@/components/ui/card";
import { Home, Warehouse } from "lucide-react";
import Link from "next/link";

export default function NavBarAdminMini() {
  return (
    <Card>
      <CardContent>
        <Link href={"/admin"}>
          <Home />
        </Link>
        <Link href={"/admin/stocks"}>
          <Warehouse />
        </Link>
        <Link href={"/admin/"}></Link>
      </CardContent>
    </Card>
  );
}
