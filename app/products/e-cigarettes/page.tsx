import { getCigarettes } from "@/lib/prisma";
import ShowProduct from "@/components/ShowProduct";

export default async function Page() {
  const data = await getCigarettes();

  return <ShowProduct products={data} category="E-Cigarettes" />;
}
