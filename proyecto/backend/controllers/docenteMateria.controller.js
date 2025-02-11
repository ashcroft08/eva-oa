import { DocenteMateria } from "../models/DocenteMateria.js";
import { Usuario } from "../models/Usuario.js";
import { Materia } from "../models/Materia.js";

/**
 * Crea una nueva asignación de un docente a una materia.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta con la asignación creada o un mensaje de error.
 */
/**
 * Crea una o varias asignaciones de un docente a materias.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta con las asignaciones creadas o un mensaje de error.
 */
export const createDocenteMateria = async (req, res) => {
    const { cod_docente, cod_materias } = req.body; // Ahora cod_materias es un array

    try {
        // Verificar si el docente existe
        const docente = await Usuario.findByPk(cod_docente);
        if (!docente) {
            return res.status(404).json({ message: 'Docente no encontrado.' });
        }

        // Verificar si todas las materias existen
        const materias = await Materia.findAll({
            where: {
                cod_materia: cod_materias
            }
        });

        if (materias.length !== cod_materias.length) {
            return res.status(404).json({ message: 'Una o más materias no existen.' });
        }

        // Verificar si ya existen asignaciones activas para las materias en cualquier docente
        const existingAssignments = await DocenteMateria.findAll({
            where: {
                cod_materia: cod_materias,
                activo: true
            }
        });

        if (existingAssignments.length > 0) {
            const materiasAsignadas = existingAssignments.map(a => a.cod_materia);
            return res.status(400).json({
                message: 'Una o más materias ya están asignadas a otro docente.',
                materiasAsignadas
            });
        }

        // Crear las nuevas asignaciones
        const nuevasAsignaciones = await Promise.all(
            cod_materias.map(async (cod_materia) => {
                return await DocenteMateria.create({
                    cod_docente,
                    cod_materia
                });
            })
        );

        return res.status(201).json(nuevasAsignaciones);
    } catch (error) {
        console.error('Error al crear las asignaciones:', error);
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
        const { activo } = req.query;
        const whereClause = activo !== undefined ? { activo: activo === 'true' } : {};

        const asignaciones = await DocenteMateria.findAll({
            where: whereClause,
            include: [
                { model: Usuario, as: 'docente' },
                { model: Materia, as: 'materia' }
            ]
        });

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
        const asignacion = await DocenteMateria.findByPk(cod_asignacion, {
            include: [
                { model: Usuario, as: 'docente' },
                { model: Materia, as: 'materia' }
            ]
        });

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

        // Verificar si el docente y la materia existen
        if (cod_docente) {
            const docente = await Usuario.findByPk(cod_docente);
            if (!docente) {
                return res.status(404).json({ message: 'Docente no encontrado.' });
            }
        }

        if (cod_materia) {
            const materia = await Materia.findByPk(cod_materia);
            if (!materia) {
                return res.status(404).json({ message: 'Materia no encontrada.' });
            }
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