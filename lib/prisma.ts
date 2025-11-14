import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

//All products
export const getProducts = async () => await prisma.products.findMany();

//User Datas
export const getUserDatas = async (userID: string) =>
  await prisma.users_sync.findUnique({
    where: {
      id: userID,
    },
    include: {
      orders: {
        include: {
          order_items: {
            include: {
              products: {
                include: {
                  categories: true, // Catégorie du produit
                },
              },
            },
          },
        },
        orderBy: {
          created_at: "desc", // Les commandes les plus récentes en premier
        },
      },
    },
  });
