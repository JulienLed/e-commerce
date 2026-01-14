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
import bcrypt from "bcryptjs";
import { checkRateLimit } from "./ipActions";

//Bcrypt salt
const salt = 15;

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
  await checkRateLimit();
  const response = signInSchema.safeParse(formData);
  if (response.error) return null;
  const { email, password } = response.data;
  const hashPasword = await bcrypt.hash(password, salt);
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
    ? await bcrypt.hash(newPassword, salt)
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

//Reset Password
export const resetPassword = async (token: string, newPassword: string) => {
  await checkRateLimit();
  const dbToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
  });
  if (!dbToken) return { success: false, message: "Mauvais Token" };
  const now = new Date(Date.now());
  const isValidToken =
    now.getTime() - dbToken.expires.getTime() < 15 * 60 * 1000;
  if (!isValidToken) return { success: false, message: "Token expiré" };
  const hashPassword = await bcrypt.hash(newPassword, salt);
  const userUpdated = await prisma.user.update({
    where: {
      id: dbToken.userId,
    },
    data: {
      password: hashPassword,
    },
  });
  if (!userUpdated)
    return {
      success: false,
      message: "Problème lors de la réinitialisation du mot de passe",
    };
  await prisma.passwordResetToken.delete({
    where: {
      token: dbToken.token,
    },
  });
  return { success: true, message: "Mot de passe bien réinitialisé" };
};
