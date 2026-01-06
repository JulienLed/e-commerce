"use server";

import { auth } from "@/src/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SignFormData, signInSchema } from "@/lib/schema";
import bcrypt from "bcrypt";

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
  const userInfos = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return userInfos;
};

//Get user count
export const getUsersCount = async () => {
  const userCount = await prisma.user.count();
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

//Sign Up new user by credentials
export const signUp = async (formData: SignFormData) => {
  const response = signInSchema.safeParse(formData);
  if (response.error) return null;
  const { email, password } = response.data;
  const hashPasword = await bcrypt.hash(password, 15);
  const userIfExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userIfExist) return null;
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashPasword,
    },
    include: {
      sessions: true,
    },
  });
  return newUser;
};
