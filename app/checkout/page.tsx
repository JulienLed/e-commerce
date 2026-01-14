import Address from "@/components/client/checkout/Address";
import { getUserInfos } from "../_action/userActions";

export default async function Page() {
  const userInfos = await getUserInfos();
  return <Address userInfos={userInfos} />;
}
