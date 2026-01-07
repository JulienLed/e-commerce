import { Cart } from "@/components/server/Cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCartByUserId } from "../_action/cartActions";

export default async function Page() {
  const cart = await getCartByUserId();
  console.log(cart);
  return (
    <div className="flex flex-col gap-2">
      <Cart />
      {cart && cart?.CartItem.length >= 1 && (
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
