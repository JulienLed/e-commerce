"use server";

import { headers } from "next/headers";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, number>({
  max: 500,
  ttl: 15 * 60 * 1000,
});

//Get IP
export const getIp = async () => {
  const headersToUse = await headers();
  const ip = headersToUse.get("x-forwarded-for");
  return ip;
};

//Check rate limit
export const checkRateLimit = async () => {
  const maxAttemps = 3;
  const ip = (await getIp()) || "";
  const currentCount = cache.get(ip) || 0;
  if (currentCount > maxAttemps) {
    throw new Error("Trop de tentatives");
  } else {
    cache.set(ip, currentCount + 1);
  }
};
