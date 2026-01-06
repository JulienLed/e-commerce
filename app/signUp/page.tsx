import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignForm from "@/components/client/signForm/SignForm";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>S'enregistrer</CardTitle>
      </CardHeader>
      <CardContent>
        <SignForm mode={"signUp"} />
      </CardContent>
    </Card>
  );
}
