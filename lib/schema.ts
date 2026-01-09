import { Prisma } from "@/generated/prisma/client";
import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const addressSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(30, "Maximum 30 caractères"),
  surname: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(30, "Maximum 30 caractères"),
  street: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(30, "Maximum 30 caractères"),
  numStreet: z.string().regex(/^\d{1,4}$/, "Entre 1 et 4 chiffres"),
  postalCode: z.string().regex(/^\d{4}$/, "Code postal à 4 chiffres"),
  city: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(30, "Maximum 30 caractères"),
  email: z.string().email(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Minimum 5 charactères"),
});

export const profilFormSchema = z.object({
  name: z.string().min(3, "Minimum 3 charactères").optional(),
  surname: z.string().min(3, "Minimum 3 charactères").optional(),
  email: z.string().email().optional(),
  newPassword: z
    .string()
    .min(3, "Minimum 3 charactères")
    .or(z.literal(""))
    .optional(),
  newPasswordConfirm: z
    .string()
    .min(3, "Minimum 3 charactères")
    .or(z.literal(""))
    .optional(),
  address: z.string().min(3, "Minimum 3 charactères").optional(),
  imgURL: z.string().url().optional().or(z.literal("")),
  role: z.string().optional(),
});

export type FormData = z.infer<typeof addressSchema>;

export type FormDataCreateProduct = {
  name: string;
  description: string;
  price: number | string;
  stock: number;
  image: string;
  categoryId: number;
};

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { Category: true };
}>;

export type OrderWithUserInfos = {
  OrderItem: ({
    Product: {
      id: number;
      name: string;
      image: string | null;
      description: string | null;
      price: number;
      stock: number;
      categoryId: number;
    };
  } & {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    priceAtPurchase: number;
  })[];
} & {
  id: number;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  guestEmail: string | null;
  shippingName: string;
  shippingSurname: string;
  shippingStreet: string;
  shippingNumStreet: string;
  shippingPostalCode: string;
  shippingCity: string;
  shippingEmail: string;
  totalAmount: number;
  status: OrderStatus;
  stripePaymentIntentId: string | null;
};

export type SignFormData = {
  email: string;
  password: string;
};

export type ProfilFormData = z.infer<typeof profilFormSchema>;
