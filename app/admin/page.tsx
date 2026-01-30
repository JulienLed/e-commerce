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
                <div className="grid grid-cols-[90%_10%] items-center">
                  <p>{`Nombre de commandes en attente de paiement : `}</p>
                  <span>{ordersCountByStatus.PENDING}</span>
                  <p>{`Nombre de commandes en attente d'envoi : `}</p>
                  <span>{ordersCountByStatus.PAID}</span>
                  <p>{`Nombre de commandes en attente de réception par le client : `}</p>
                  <span>{ordersCountByStatus.SHIPPED}</span>
                  <p>{`Nombre de commandes délivrées : `}</p>
                  <span>{ordersCountByStatus.DELIVERED}</span>
                  <p>{`Nombre de commandes annulées : `}</p>
                  <span>{ordersCountByStatus.CANCELLED}</span>
                </div>
              </section>
              <section id="sales">
                <h2 className="text-xl font-semibold">Les ventes</h2>
                <div className="grid grid-cols-[auto_auto] items-center">
                  <p>{`Depuis l'ouverture, votre chiffre d'affaire est de : `}</p>
                  <span>{(sales / 100).toFixed(2)} €</span>
                </div>
              </section>
              <section id="usersCount">
                <h2 className="text-xl font-semibold">
                  Les utilisateurs du site
                </h2>
                <div className="grid grid-cols-[90%_10%] items-center">
                  <p>{`Nombre d'utilisateurs inscrit sur site : `}</p>
                  <span>{usersCount.userCount}</span>
                  <p>{`Nombre d'utilisateurs non-inscrit sur site : `}</p>
                  <span>{usersCount.guestCount}</span>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
