"use server";

import { Resend } from "resend";
import OrderConfirmation from "@/emails/OrderConfirmation";
import { getOrderByOrderId } from "./orderActions";

const resend = new Resend(process.env.RESEND_API_KEY);

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
