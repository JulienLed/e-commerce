"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface HandleCartProps {
  productId: number;
}

export default function HandleCart({ productId }: HandleCartProps) {
  const [count, setCount] = useState(0);

  const handleCartItem = async () => {
    //Créer cart si pas cart
    const cartData = await fetch("/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const cartDataJson = await cartData.json();
    if (!cartDataJson) {
      const response = await fetch("api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      console.log("Réponse création cart : " + JSON.stringify(responseJson));
    }
    const cartItems = await fetch("/api/cartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, productCount: count }),
    });
    const cartItemsJson = await cartItems.json();
    console.log("CartITemJson est : " + JSON.stringify(cartItemsJson));
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      <Input value={count} className="text-center w-[50%]" />
      <div id="countBtn" className="flex justify-evenly w-full">
        <Button onClick={() => setCount((prev) => prev + 1)}>+</Button>
        <Button
          onClick={() => setCount((prev) => (prev < 1 ? prev : prev - 1))}
        >
          -
        </Button>
      </div>

      <Button onClick={() => handleCartItem()}>Ajouter au panier</Button>
    </div>
  );
}
