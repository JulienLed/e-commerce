import Adress from "@/components/client/checkout/Adress";
import { getUserInfos } from "../action/userActions";

export default async function Page() {
  const userInfos = await getUserInfos();
  return <Adress userInfos={userInfos} />;
}
