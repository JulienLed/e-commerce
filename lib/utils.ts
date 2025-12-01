import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "@/src/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Get User ID OR give a guestId
export const getUserId = async () => {
  const session = await auth();
  if (session?.user?.id) {
    return session?.user?.id;
  } else {
    if (typeof window !== "undefined") {
      let guestId = localStorage.getItem("guestId");
      if (!guestId) {
        guestId = crypto.randomUUID();
        localStorage.setItem("guestId", guestId);
      }
      return guestId;
    }
  }
};
