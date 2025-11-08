import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

//All products
export const getProducts = async () => await prisma.products.findMany();
