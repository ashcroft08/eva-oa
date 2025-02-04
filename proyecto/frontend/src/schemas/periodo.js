import { z } from 'zod';

export const periodoSchema = z.object({
    anio_lectivo: z.string().min(1, { message: 'El año lectivo es obligatorio' }),
    fecha_inicio: z.string()
        .min(1, { message: "La fecha de inicio es obligatoria" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de inicio debe estar en formato YYYY-MM-DD" }),
    fecha_fin: z.string()
        .min(1, { message: "La fecha de finalización es obligatoria" }) // Este mensaje se mantendrá
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de fin debe estar en formato YYYY-MM-DD" }),
}).refine(data => new Date(data.fecha_fin) > new Date(data.fecha_inicio), {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["fecha_fin"],
});