"use server";

import { prisma } from "@/lib/prisma";

//Get product by productId
export const getProduct = async (productId: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Category: true,
    },
  });
  return product;
};

//Get All products order by Category
export const getAllProducts = async () => {
  const allProducts = await prisma.product.findMany({
    include: {
      Category: true,
    },
  });
  type ProductWithCategory = (typeof allProducts)[0];
  const productGroupByCat: Record<string, ProductWithCategory[]> = {};

  allProducts.forEach((product) => {
    if (!productGroupByCat[product.Category.name]) {
      productGroupByCat[product.Category.name] = [];
    }
    productGroupByCat[product.Category.name].push(product);
  });
  return productGroupByCat;
};

//Update Stock
export const updateStockProduct = async (productId: number, stock: number) => {
  const validUpdateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock,
    },
  });
  return validUpdateProduct;
};

//Update Price
export const updatePriceProduct = async (productId: number, price: number) => {
  const validUpdateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      price,
    },
  });
  return validUpdateProduct;
};
