import { z } from 'zod';

// Esquema para validar una matrícula
export const matriculaSchema = z.object({
    cod_periodo: z.number().int().positive(), // Código del período (entero positivo)
    cod_curso: z.number().int().positive(),   // Código del curso (entero positivo)
    cod_estudiantes: z.array(z.number().int().positive()), // Arreglo de códigos de estudiantes (enteros positivos)
});