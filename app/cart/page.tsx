import { Cart } from "@/components/server/Cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCartByUserId } from "../action/cartActions";

export default async function Page() {
  const cart = await getCartByUserId();
  return (
    <div className="flex flex-col gap-2">
      <Cart />
      {(!cart?.CartItem || cart?.CartItem.length > 1) && (
        <Button>
          <Link href={"/checkout"}>Procéder au paiement</Link>
        </Button>
      )}

      <Button>
        <Link href={"/"}>Continuer mes achats</Link>
      </Button>
    </div>
  );
}
