import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfos } from "@/app/_action/userActions";
import { getAllProducts } from "@/app/_action/productActions";
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
import DeleteProduct from "@/components/client/dashboard/DeleteProduct";
import NewProduct from "@/components/client/dashboard/NewProduct";
import NewCategory from "@/components/client/dashboard/NewCategory";
import DeleteCategory from "@/components/client/dashboard/DeleteCategory";
import ModifyNameInput from "@/components/client/dashboard/ModifyNameInput";
import ModifyImageProduct from "@/components/client/dashboard/ModifyImageProduct";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page() {
  const user = await getUserInfos();
  const allProducts = await getAllProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Bienvenue ${user?.name}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <NewCategory />
          {Object.entries(allProducts).map(([category, products]) => {
            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{category}</CardTitle>
                    <DeleteCategory categoryId={products.categoryId} />
                  </div>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<Loading />}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Produit</TableHead>
                          <TableHead>Prix (en centimes)</TableHead>
                          <TableHead>Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.products.length >= 1 &&
                          products.products.map((product) => {
                            return (
                              <TableRow key={product.id}>
                                <TableCell>
                                  <ModifyImageProduct product={product} />
                                </TableCell>
                                <TableCell>
                                  <ModifyNameInput product={product} />
                                </TableCell>
                                <TableCell>
                                  <ModifyPriceInput product={product} />
                                </TableCell>
                                <TableCell>
                                  <ModifyStockInput product={product} />
                                </TableCell>
                                <TableCell>
                                  <DeleteProduct product={product} />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            <NewProduct categoryId={products.categoryId} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Suspense>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
