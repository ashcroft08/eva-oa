import { z } from 'zod';

export const cursoSchema = z.object({
    nombre_curso: z.string({
        required_error: 'El nombre del curso es obligatorio',
    }),
    paralelo: z.string({
        required_error: 'El paralelo es obligatorio',
    }),
})