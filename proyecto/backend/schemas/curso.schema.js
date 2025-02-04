import { z } from 'zod';

export const cursoSchema = z.object({
    nombre_curso: z.string().min(1, "El nombre del curso es obligatorio"),
    paralelo: z.string().min(1, "El paralelo es obligatorio"),
});