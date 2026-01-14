import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignForm from "@/components/client/signForm/SignForm";

export default function Page() {
  const token = crypto.randomUUID();
  return (
    <Card>
      <CardHeader>
        <CardTitle>S'enregistrer</CardTitle>
      </CardHeader>
      <CardContent>
        <SignForm mode={"signUp"} token={token} />
      </CardContent>
    </Card>
  );
}
