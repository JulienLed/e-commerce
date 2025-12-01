"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { CartItem } from "@/generated/prisma/client";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
};

type ProductCount = {
  id: number;
  countById: number;
};

type ShowProductProps = {
  products: Product[];
  category: string;
};

export default function ShowProduct({ products, category }: ShowProductProps) {
  const [count, setCount] = useState<ProductCount[]>([{ id: 0, countById: 0 }]);

  const handleCount = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    const buttonValue = e.currentTarget.id;
    if (buttonValue === "plus" && count) {
      const product = count.find((product) => product.id === productId);
      product
        ? setCount((prev) =>
            prev.map((el) =>
              el.id === productId ? { ...el, countById: el.countById++ } : el
            )
          )
        : setCount((prev) => [...prev, { id: productId, countById: 1 }]);
    } else {
      if (buttonValue === "minus" && count) {
        const product = count.find((product) => product.id === productId);
        product
          ? setCount((prev) =>
              prev.map((el) =>
                el.id === productId ? { ...el, countById: el.countById-- } : el
              )
            )
          : setCount((prev) => [...prev, { id: productId, countById: 0 }]);
      }
    }
  };

  /********************************************************************************************************/
  //Il faut gérer les cas d'un cart sans connection. Il faut un cart et cartItem créé grace
  //au GET de la DB sur les products, puis fetch tout ça si le user se connecte pou créer un user en DB
  /********************************************************************************************************/
  const handleCart = async (productId: number) => {
    const cart = await fetch("/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productCount = count.find((el) => el.id === productId)?.countById;

    //Vérif si cart existe pour user
    if (cart) {
      //Get les cartItems
      const responseCartItems = await fetch("/api/cartItem", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cartItems = await responseCartItems.json();
      //Vérif si cartItem contient le produit
      const cartItem = (Object.values(cartItems) as CartItem[]).find(
        (item) => item.productId === productId
      );
      if (cartItem) {
        const cartItemId = cartItem.id;
        const responsePut = await fetch("/api/cartItem", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItemId, productId, productCount }),
        });
        console.log("Réponse serveur pour PUT CartItem" + responsePut.json());
      } else {
        const responsePost = await fetch("/api/cartItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, productCount }),
        });
        console.log("Réponse serveur pour POST CartItem" + responsePost.json());
      }
    }
    //Si cart n'existe pas pour user
    else if (!cart) {
      const responseCart = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Réponse serveur pour POST Cart" + responseCart.json());
      const responsePost = await fetch("/api/cartItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, productCount }),
      });
      console.log("Réponse serveur pour POST CartItem" + responsePost.json());
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>{"Nos " + category}</CardHeader>
      <CardContent className="grid grid-cols-5 gap-2">
        {products.map((product) => {
          return (
            <Card key={product.id}>
              <CardHeader>{product.name}</CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  <p>{product.description}</p>
                  <p>{product.price / 100} €</p>
                  <div className="flex justify-between gap-2">
                    <Button
                      id="plus"
                      className="w-1"
                      onClick={(e) => handleCount(e, product.id)}
                    >
                      +
                    </Button>
                    <Button
                      id="minus"
                      className="w-1"
                      onClick={(e) => handleCount(e, product.id)}
                    >
                      -
                    </Button>
                  </div>
                  <p>{count.find((el) => el.id === product.id)?.countById}</p>
                  <Button
                    size={"sm"}
                    id="validate"
                    onClick={() => handleCart(product.id)}
                  >
                    Ajouter au panier
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
