import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const getUserByCredentials = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      sessions: true,
    },
  });
  if (!user || !user.password) return null;
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) return null;
  return user;
};
