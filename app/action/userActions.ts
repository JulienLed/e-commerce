"use server";

import { auth } from "@/src/auth";
import { cookies } from "next/headers";

//Get User ID OR give a guestId
export const getUserId = async () => {
  const session = await auth();
  if (session?.user?.id) return { type: "user", id: session.user.id };
  const cookieStore = await cookies();
  let guestId = cookieStore.get("guestId")?.value;
  if (!guestId) {
    guestId = crypto.randomUUID();
    cookieStore.set("guestId", guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 30 * 24,
    });
    return { type: "guest", id: guestId };
  } else {
    return { type: "guest", id: guestId };
  }
};
