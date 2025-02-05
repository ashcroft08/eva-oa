import { z } from 'zod';

// Esquema para validar un período
export const matriculaSchema = z.object({
    cod_periodo: z.number().int().positive(), // Código del período (entero positivo)
    cod_curso: z.number().int().positive(),   // Código del curso (entero positivo)
    cod_usuario: z.number().int().positive(), // Código del usuario (entero positivo)
});