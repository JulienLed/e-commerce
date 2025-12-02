import { ShowProduct } from "@/components/ShowProduct";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  const { product } = await params;
  const data = await prisma.product.findMany({
    where: {
      Category: {
        name: product,
      },
    },
    include: {
      Category: true,
    },
  });

  return <ShowProduct data={data} />;
}
