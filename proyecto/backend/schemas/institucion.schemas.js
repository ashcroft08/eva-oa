import { z } from "zod";

export const institucionSchema = z.object({
    nombre_institucion: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});