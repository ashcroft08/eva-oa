/**
 * Controlador para manejar las asignaciones de docentes a materias.
 * @module controllers/DocenteMateriaController
 */

import { DocenteMateria } from "../models/DocenteMateria.js";

/**
 * Crea una nueva asignación de un docente a una materia.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta con la asignación creada o un mensaje de error.
 */
export const createDocenteMateria = async (req, res) => {
    const { cod_docente, cod_materia } = req.body;

    try {
        // Verificar si ya existe una asignación activa para el docente y la materia
        const existingAssignment = await DocenteMateria.findOne({
            where: {
                cod_docente,
                cod_materia,
                activo: true
            }
        });

        if (existingAssignment) {
            return res.status(400).json({ message: 'El docente ya está asignado a esta materia.' });
        }

        // Crear la nueva asignación
        const nuevaAsignacion = await DocenteMateria.create({
            cod_docente,
            cod_materia
        });

        return res.status(201).json(nuevaAsignacion);
    } catch (error) {
        console.error('Error al crear la asignación:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Obtiene todas las asignaciones de docentes a materias.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta con la lista de asignaciones.
 */
export const getDocentesMaterias = async (req, res) => {
    try {
        const asignaciones = await DocenteMateria.findAll();
        return res.status(200).json(asignaciones);
    } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Obtiene una asignación específica por su código de asignación.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta con la asignación solicitada o un mensaje de error.
 */
export const getDocenteMateria = async (req, res) => {
    const { cod_asignacion } = req.params;

    try {
        const asignacion = await DocenteMateria.findByPk(cod_asignacion);

        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación no encontrada.' });
        }

        return res.status(200).json(asignacion);
    } catch (error) {
        console.error('Error al obtener la asignación:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Actualiza una asignación existente.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta con la asignación actualizada o un mensaje de error.
 */
export const updateDocenteMateria = async (req, res) => {
    const { cod_asignacion } = req.params;
    const { cod_docente, cod_materia, activo } = req.body;

    try {
        const asignacion = await DocenteMateria.findByPk(cod_asignacion);

        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación no encontrada.' });
        }

        // Actualizar los campos
        asignacion.cod_docente = cod_docente || asignacion.cod_docente;
        asignacion.cod_materia = cod_materia || asignacion.cod_materia;
        asignacion.activo = activo !== undefined ? activo : asignacion.activo;

        await asignacion.save();

        return res.status(200).json(asignacion);
    } catch (error) {
        console.error('Error al actualizar la asignación:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Desactiva una asignación existente.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta con un mensaje de éxito o error.
 */
export const deleteDocenteMateria = async (req, res) => {
    const { cod_asignacion } = req.params;

    try {
        const asignacion = await DocenteMateria.findByPk(cod_asignacion);

        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación no encontrada.' });
        }

        // Desactivar la asignación
        asignacion.activo = false;
        await asignacion.save();

        return res.status(200).json({ message: 'Asignación desactivada correctamente.' });
    } catch (error) {
        console.error('Error al desactivar la asignación:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};