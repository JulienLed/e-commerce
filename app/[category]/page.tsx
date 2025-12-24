import { ShowProduct } from "@/components/server/ShowProduct";
import { getProductsByCategory } from "../_action/productActions";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { products } = await getProductsByCategory(category);
  if (products.length < 1) notFound();

  return <ShowProduct products={products} category={category} />;
}
