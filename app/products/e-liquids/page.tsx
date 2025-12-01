import ShowProduct from "@/components/ShowProduct";
import { getLiquids } from "@/lib/prisma";

export default async function Page() {
  const data = await getLiquids();
  return <ShowProduct products={data} category="E-Liquids" />;
}
