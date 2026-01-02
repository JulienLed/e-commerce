import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/client/signIn/SignInForm";

export default function Page() {
  <Card>
    <CardHeader>
      <CardTitle>Se connecter</CardTitle>
    </CardHeader>
    <CardContent>
      <SignInForm />
    </CardContent>
  </Card>;
}
