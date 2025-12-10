import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ShoppingCart } from "lucide-react";
import { Cart } from "./Cart";

export const CartDialog = async () => {
  return (
    <Dialog>
      <DialogTrigger>
        <ShoppingCart />
      </DialogTrigger>
      <DialogContent>
        <Cart />
      </DialogContent>
    </Dialog>
  );
};
