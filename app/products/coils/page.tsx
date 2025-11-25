"use server";

import { getCoils } from "@/lib/prisma";

export default async function Page() {
  const data = await getCoils();

  return <div>{JSON.stringify(data)}</div>;
}
