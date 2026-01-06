import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignForm from "@/components/client/signForm/SignForm";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
      </CardHeader>
      <CardContent>
        <SignForm mode={"signIn"} />
      </CardContent>
    </Card>
  );
}
