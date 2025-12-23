"use server";

import { prisma } from "@/lib/prisma";

//Get All categories
export const getAllCategories = async () => {
  const allCategories = await prisma.category.findMany();
  return allCategories;
};

//Create new category
export const createCategory = async (category: string) => {
  const newCategory = await prisma.category.create({
    data: {
      name: category,
    },
  });
  return newCategory;
};

//Delete category if no products
export const deleteCategory = async (categoryId: number) => {
  const countProduct = await prisma.product.count({
    where: {
      categoryId,
    },
  });
  if (countProduct > 0)
    return { success: false, message: "Présence de produits" };
  const deletedCategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return { success: true, data: deletedCategory };
};
