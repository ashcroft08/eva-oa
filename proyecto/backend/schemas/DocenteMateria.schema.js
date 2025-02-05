import { z } from 'zod';

// Esquema para crear una nueva asignación
export const createDocenteMateriaSchema = z.object({
    cod_docente: z.number().int().positive("El código del docente debe ser un número positivo."),
    cod_materia: z.number().int().positive("El código de la materia debe ser un número positivo."),
});

// Esquema para actualizar una asignación
export const updateDocenteMateriaSchema = z.object({
    cod_docente: z.number().int().positive().optional(),
    cod_materia: z.number().int().positive().optional(),
    activo: z.boolean().optional(),
});