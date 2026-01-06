import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfos } from "../_action/userActions";
import UserProfile from "@/components/client/profile/UserProfile";
import { notFound } from "next/navigation";

export default async function Page() {
  const user = await getUserInfos();
  if (user)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Votre Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? <UserProfile user={user} /> : notFound()}
        </CardContent>
      </Card>
    );
}
