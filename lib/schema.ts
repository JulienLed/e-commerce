import { z } from "zod";

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

export type FormData = z.infer<typeof addressSchema>;

export type FormDataCreateProduct = {
  name: string;
  description: string;
  price: number | string;
  stock: number;
  image: string;
  categoryId: number;
};
