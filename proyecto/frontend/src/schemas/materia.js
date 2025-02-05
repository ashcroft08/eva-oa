import { z } from 'zod';

export const materiaSchema = z.object({
    nombre_materia: z.string().min(1, "El nombre de la materia es obligatorio"),
    //cod_curso: z.int().min(1, "El curso es obligatorio"),
});