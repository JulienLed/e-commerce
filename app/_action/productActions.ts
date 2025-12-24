"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FormDataCreateProduct } from "@/lib/schema";

//Get product by productId
export const getProduct = async (productId: number) => {
  if (isNaN(productId)) return { success: false, data: undefined };
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Category: true,
    },
  });
  if (!product) return { success: false, data: undefined };
  return { success: true, data: product };
};

//Get Products by Category name
export const getProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      Category: {
        name: category,
      },
    },
    include: {
      Category: true,
    },
  });

  return { products };
};

//Get products by string includes
export const getProductsByString = async (str: string) => {
  const products = await prisma.product.findMany({
    take: 5,
    where: {
      name: {
        contains: str,
        mode: "insensitive",
      },
    },
    include: {
      Category: true,
    },
  });
  return products;
};

//Get All products order by Category
export const getAllProducts = async () => {
  const allProducts = await prisma.product.findMany({
    include: {
      Category: true,
    },
  });

  const allCategories = await prisma.category.findMany();

  type ProductWithCategory = (typeof allProducts)[0];
  const productGroupByCat: Record<
    string,
    { categoryId: number; products: ProductWithCategory[] }
  > = {};

  allCategories.forEach((category) => {
    productGroupByCat[category.name] = {
      categoryId: category.id,
      products: [],
    };
  });

  allProducts.forEach((product) => {
    productGroupByCat[product.Category.name].products.push(product);
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

//Update Name
export const updateNameProduct = async (
  productId: number,
  productName: string
) => {
  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: productName,
    },
  });
  return product;
};

//Update image url
export const updateImageUrlProduct = async (
  productId: number,
  newUrl: string
) => {
  if (!newUrl.includes("images.pexels.com"))
    return {
      success: false,
      message:
        "Mauvaise URL. Veuillez utiliser une image présente sur www.pexels.com",
    };
  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      image: newUrl,
    },
  });
  return { success: true, product };
};

//Delete product
export const deleteProduct = async (productId: number) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  revalidatePath("/admin/stock");
  return deleteProduct;
};

//Create Product
export const createProduct = async (formData: FormDataCreateProduct) => {
  const newProduct = await prisma.product.create({
    data: {
      name: formData.name,
      image: formData.image,
      description: formData.description,
      stock: formData.stock,
      price: Number(formData.price),
      Category: {
        connect: {
          id: formData.categoryId,
        },
      },
    },
  });
  return newProduct;
};
