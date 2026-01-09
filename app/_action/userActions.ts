"use server";

import { auth } from "@/src/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  ProfilFormData,
  profilFormSchema,
  SignFormData,
  signInSchema,
} from "@/lib/schema";
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

//Update user infos
export const updateUserInfo = async (formData: ProfilFormData) => {
  const response = profilFormSchema.safeParse(formData);
  if (response.error) {
    const errorsFlat = response.error.flatten();
    const errors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(errorsFlat.fieldErrors)) {
      if (messages && messages.length > 0) {
        errors[field] = messages[0];
      }
    }
    return {
      success: false,
      data: "Erreur dans le formulaire",
      errors: errors,
    };
  }
  const {
    name,
    surname,
    address,
    email,
    newPassword,
    newPasswordConfirm,
    imgURL,
  } = response.data;
  const user = await getUserInfos();
  if (newPassword !== newPasswordConfirm)
    return { success: false, data: "Veuillez indiquer les même mot de passe" };
  if (
    imgURL &&
    !imgURL.includes("images.pexels.com") &&
    !imgURL.includes("lh3.googleusercontent.com")
  )
    return {
      success: false,
      data: "Veuillez choisir une image provenant de images.pexels.com",
    };
  if (user?.password && newPassword) {
    const isSamePwd = await bcrypt.compare(newPassword, user?.password);
    if (isSamePwd)
      return {
        success: false,
        data: "Veuillez choisir un mot de passe différent",
      };
  }
  const hashNewPassword = newPassword
    ? await bcrypt.hash(newPassword, 15)
    : null;
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
      surname,
      address,
      email,
      password: hashNewPassword,
      image: imgURL,
    },
  });
  if (!updatedUser)
    return {
      success: false,
      data: "Problème lors de la mise à jour des infos",
    };
  return { success: true, data: "Informations de profil bien mises à jour" };
};
