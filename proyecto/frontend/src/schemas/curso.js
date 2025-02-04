import { z } from 'zod';

export const cursoSchema = z.object({
    nombre_curso: z.string()
        .min(1, { message: 'El nombre del curso es obligatorio' }), // ⬅️ Valida longitud mínima
    paralelo: z.string()
        .min(1, { message: 'El paralelo es obligatorio' }),
});