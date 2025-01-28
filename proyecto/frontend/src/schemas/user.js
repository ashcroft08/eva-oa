import { z } from 'zod';

// Función para validar cédula
const validarCedula = (cedula) => {
    if (cedula.length !== 10) return false;
    let par = 0, imp = 0, suma = 0;
    for (let i = 0; i < 9; i++) {
        const digito = parseInt(cedula[i]);
        if (i % 2 === 0) { // Impares (índices pares en base 0)
            const mult = digito * 2;
            imp += mult > 9 ? mult - 9 : mult;
        } else { // Pares
            par += digito;
        }
    }
    suma = par + imp;
    const digitoVerificador = parseInt(cedula[9]);
    const resultado = (suma % 10 === 0) ? 0 : 10 - (suma % 10);
    return resultado === digitoVerificador;
};

// Esquema de edición
export const editSchema = z.object({
    cedula: z.string({
        required_error: 'La cédula es obligatoria',
    }).refine(validarCedula, {
        message: 'La cédula es inválida',
    }),
    nombres: z.string().min(2, {
        required_error: 'Los nombres son obligatorios',
    }),
    apellidos: z.string().min(2, {
        required_error: 'Los apellidos son obligatorios',
    }),
    email: z.string({
        required_error: 'El correo electrónico es obligatorio',
    }).email({
        message: 'Correo electrónico inválido',
    }),
});