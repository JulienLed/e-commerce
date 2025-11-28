"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Cart, isCart } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function ShowProduct(products: Product[], category: string) {
  const [count, setCount] = useState<number>(0);

  const handleCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.currentTarget.id;
    buttonValue === "+"
      ? setCount((prev) => prev + 1)
      : setCount((prev) => prev - 1);
  };

  const handleCart = async (
    productName: string,
    productId: number,
    productStock: number
  ) => {
    const cart = getCart();
    //Vérifier la taille du cart : si moins que un -> Create sinon Update
  };

  return (
    <Card>
      <CardHeader>{"Nos " + category}</CardHeader>
      <CardContent>
        {products.map((product) => {
          return (
            <Card>
              <CardHeader>{product.name}</CardHeader>
              <CardContent>
                <div>
                  <p>{product.description}</p>
                  <p>{product.price / 100} €</p>
                  <Button id="plus" onClick={(e) => handleCount(e)}>
                    +
                  </Button>
                  <Button id="minus" onClick={(e) => handleCount(e)}>
                    -
                  </Button>
                  <p>{count}</p>
                  <Button
                    id="validate"
                    onClick={(e) =>
                      handleCart(e, product.name, product.id, product.stock)
                    }
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
