import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "@/src/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Get User ID
export const getUserId = async () => {
  const session = await auth();
  return session?.user?.id;
};
