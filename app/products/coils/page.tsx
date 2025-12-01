import { getCoils } from "@/lib/prisma";
import ShowProduct from "@/components/ShowProduct";

export default async function Page() {
  const data = await getCoils();

  return <ShowProduct products={data} category="Résistances" />;
}
