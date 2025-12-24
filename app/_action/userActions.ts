"use server";

import { auth } from "@/src/auth";
import { cookies } from "next/headers";

//Get User ID
export const getUserId = async () => {
  const session = await auth();
  if (session?.user?.id) return { type: "user", id: session.user.id };
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;
  return { type: "guest", id: guestId };
};

//Get User Infos
export const getUserInfos = async () => {
  const user = await getUserId();
  const userInfos = await prisma?.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return userInfos;
};

//Get user count
export const getUsersCount = async () => {
  const userCount = await prisma?.user.count();
  const guestCountArr = await prisma?.order.groupBy({
    by: ["guestEmail"],
    where: {
      userId: null,
      guestEmail: { not: null },
    },
  });
  const guestCount = guestCountArr?.length;
  return { userCount, guestCount };
};
