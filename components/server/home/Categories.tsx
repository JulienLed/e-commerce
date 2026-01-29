import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  const getCategoryImage = (categoryId: number) => {
    let image = "";
    for (let product of products) {
      if (product.categoryId === categoryId) {
        image = product.image!;
      }
    }
    return image;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-10">
      {categories.map((category) => {
        return (
          <Link
            key={category.id}
            href={`/${category.name}`}
            className="relative flex justify-center items-center w-30 md:w-50 h-30 md:h-50 justify-self-center hover:scale-105 transition-all duration-200"
          >
            <Image
              alt="category-image"
              src={getCategoryImage(category.id)}
              fill
              className="rounded-lg"
            />
            <div className="absolute w-full h-full bg-fuchsia-200/20"></div>
            <p className="absolute font-bold text-base md:text-xl text-fuchsia-800 bg-fuchsia-200/70 rounded-lg p-1">
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
