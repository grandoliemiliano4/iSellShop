import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.coerce.number().min(0, "El precio debe ser un valor positivo"),
  description: z.string().min(1, "La descripción es obligatoria"),
  category: z.string().min(1, "La categoría es obligatoria"),
  condition: z.string().min(1, "La condición es obligatoria"),
  image: z.any().optional(), // File o string
});

export type ProductFormValues = z.infer<typeof productSchema>;
