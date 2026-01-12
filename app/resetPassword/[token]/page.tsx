import ResetPassword from "@/components/client/resetPassword/ResetPassword";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const dbToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
  });
  if (!dbToken) {
    console.log("Pas le bon token");
    return notFound();
  }
  const now = new Date(Date.now());
  const isTokenValid =
    now.getTime() - dbToken.expires.getTime() < 15 * 90 * 1000;
  if (!isTokenValid) {
    console.log("Token plus valide");
    return notFound();
  }
  return <ResetPassword token={token} />;
}
