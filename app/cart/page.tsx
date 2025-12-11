import { Cart } from "@/components/server/Cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <Cart />
      <Button>
        <Link href={"/checkout"}>Procéder au paiement</Link>
      </Button>
      <Button>
        <Link href={"/"}>Continuer mes achats</Link>
      </Button>
    </div>
  );
}
