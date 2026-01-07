import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfos } from "../_action/userActions";
import UserProfile from "@/components/client/profile/UserProfile";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const user = await getUserInfos();
  if (user)
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Votre Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <SessionProvider>
            {user ? <UserProfile user={user} /> : notFound()}
          </SessionProvider>
        </CardContent>
      </Card>
    );
}
