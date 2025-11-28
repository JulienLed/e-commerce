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

//Get Cart by User ID
export const getCart = async () => {
  const userId = await getUserId();
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
};
