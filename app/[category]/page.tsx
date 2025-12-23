import { ShowProduct } from "@/components/server/ShowProduct";
import { getProductsByCategory } from "../action/productActions";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { products } = await getProductsByCategory(category);

  return <ShowProduct products={products} category={category} />;
}
