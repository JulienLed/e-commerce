import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfos, getUsersCount } from "../_action/userActions";
import { getOrdersCountByStatus, getSales } from "../_action/orderActions";

export default async function Page() {
  const user = await getUserInfos();
  const ordersCountByStatus = await getOrdersCountByStatus();
  const sales = await getSales();
  const usersCount = await getUsersCount();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Bienvenue ${user?.name}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-5">
              <section id="orders">
                <h2 className="text-xl font-semibold">Les commandes</h2>
                <p>{`Nombre de commandes en attente de paiement : ${ordersCountByStatus.PENDING}`}</p>
                <p>{`Nombre de commandes en attente d'envoi : ${ordersCountByStatus.PAID}`}</p>
                <p>{`Nombre de commandes en attente de réception par le client : ${ordersCountByStatus.SHIPPED}`}</p>
                <p>{`Nombre de commandes délivrées : ${ordersCountByStatus.DELIVERED}`}</p>
                <p>{`Nombre de commandes annulées : ${ordersCountByStatus.CANCELLED}`}</p>
              </section>
              <section id="sales">
                <h2 className="text-xl font-semibold">Les ventes</h2>
                <p>{`Depuis l'ouverture, votre chiffre d'affaire est de : ${(
                  sales / 100
                ).toFixed(2)} €`}</p>
              </section>
              <section id="usersCount">
                <h2 className="text-xl font-semibold">
                  Les utilisateurs du site
                </h2>
                <p>{`Nombre d'utilisateurs inscrit sur site : ${usersCount.userCount}`}</p>
                <p>{`Nombre d'utilisateurs non-inscrit sur site : ${usersCount.guestCount}`}</p>
              </section>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
