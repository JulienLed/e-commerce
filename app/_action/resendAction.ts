"use server";

import { Resend } from "resend";
import OrderConfirmation from "@/emails/OrderConfirmation";
import { getOrderByOrderId } from "./orderActions";
import { prisma } from "@/lib/prisma";
import ForgotPasswordMail from "@/emails/ForgotPasswordMail";

const resend = new Resend(process.env.RESEND_API_KEY);

//Send an Order Confirmation Mail
export const sendOrderConfirmationEMail = async (orderId: number) => {
  try {
    const order = await getOrderByOrderId(orderId);
    if (!order) return { success: false, message: "No order" };
    const { data, error } = await resend.emails.send({
      from: "Smoke <onboarding@resend.dev>",
      to: "contact@lepoteauduweb.be",
      subject: `Votre commande n°${orderId}`,
      react: OrderConfirmation({ order }),
    });
    if (error) {
      console.error("❌ Erreur envoi email:", error);
      return { success: false, error };
    }
    console.log("✅ Email envoyé avec succès:", data);
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error };
  }
};

//Send a recovery password mail
export const resendForgotPassword = async (email: string, token: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return {
        success: false,
        message: "Pas d'utilisateur enregistré pour cette adresse mail",
      };
    const expireDate = new Date(Date.now() + 15 * 60 * 1000);
    const userId = user.id;
    const dbToken = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
      },
    });
    const now = new Date(Date.now());
    if (dbToken && now.getTime() < dbToken?.expires.getTime())
      return {
        success: false,
        message: "Trop de tentatives. Réessayez plus tard",
      };
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: dbToken?.userId,
      },
    });
    const newDbToken = await prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expires: expireDate,
      },
    });
    const domain = process.env.NEXT_PUBLIC_URL
      ? process.env.NEXT_PUBLIC_URL
      : "http://localhost:3000";
    const url = `${domain}/resetPassword/${token}`;
    const { data, error } = await resend.emails.send({
      from: "Smoke <onboarding@resend.dev>",
      to: "contact@lepoteauduweb.be",
      subject: `Réinitialisation de votre mot de passe`,
      react: ForgotPasswordMail(url),
    });
    if (error) {
      console.error("❌ Erreur envoi email:", error);
      return { success: false, error };
    }
    console.log("✅ Email envoyé avec succès:", data);
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error };
  }
};
