import { z } from 'zod';

// Esquema para validar un período
export const periodoSchema = z.object({
    anio_lectivo: z.string().min(1, { required_error: 'El año lectivo es obligatorio', }), // Año lectivo
    fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de inicio debe estar en formato YYYY-MM-DD" }), // Fecha en formato YYYY-MM-DD
    fecha_fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de fin debe estar en formato YYYY-MM-DD" }), // Fecha en formato YYYY-MM-DD
}).refine(data => new Date(data.fecha_fin) > new Date(data.fecha_inicio), {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["fecha_fin"], // Asocia el error al campo fecha_fin
});