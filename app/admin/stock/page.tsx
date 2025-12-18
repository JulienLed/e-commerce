import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfos } from "@/app/action/userActions";
import { getAllProducts } from "@/app/action/productAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModifyStockInput from "@/components/client/dashboard/ModifyStockInput";
import ModifyPriceInput from "@/components/client/dashboard/ModifyPriceInput";

export default async function Page({
  params,
}: {
  params: Promise<{ sortBy: string; order: string }>;
}) {
  const { sortBy, order } = await params;
  const user = await getUserInfos();
  const allProducts = await getAllProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Bienvenue ${user?.name}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {Object.entries(allProducts).map(([category, products]) => {
            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Prix (en centimes)</TableHead>
                        <TableHead>Stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => {
                        return (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                              <ModifyPriceInput product={product} />
                            </TableCell>
                            <TableCell>
                              <ModifyStockInput product={product} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
