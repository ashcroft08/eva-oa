import { Matricula } from "../models/Matricula.js";
import { Op } from 'sequelize';

/**
 * Crea una nueva matrícula.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta JSON con la matrícula creada o un mensaje de error.
 */
export const createMatricula = async (req, res) => {
    try {
        const { cod_periodo, cod_curso, cod_estudiantes } = req.body;

        // Verifica si cod_estudiantes es un arreglo
        if (!Array.isArray(cod_estudiantes)) {
            return res.status(400).json({ message: 'cod_estudiantes debe ser un arreglo' });
        }

        const matriculasCreadas = [];

        // Itera sobre cada estudiante
        for (const cod_estudiante of cod_estudiantes) {
            // Verifica si la matrícula ya existe
            const existingMatricula = await Matricula.findOne({
                where: {
                    cod_periodo,
                    cod_curso,
                    cod_estudiante,
                }
            });

            if (existingMatricula) {
                return res.status(400).json({ message: `El estudiante con ID ${cod_estudiante} ya está matriculado` });
            }

            // Crea una nueva matrícula
            const newMatricula = await Matricula.create({
                cod_periodo,
                cod_curso,
                cod_estudiante,
            });

            matriculasCreadas.push(newMatricula);
        }

        return res.status(201).json(matriculasCreadas);
    } catch (error) {
        console.error("Error al crear la matrícula:", error);
        return res.status(500).json({ message: "Error al crear la matrícula", error: error.message });
    }
};
/**
 * Obtiene una matrícula por su código.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta JSON con la matrícula encontrada o un mensaje de error.
 */
export const getMatricula = async (req, res) => {
    try {
        const { cod_matricula } = req.params;

        const matricula = await Matricula.findByPk(cod_matricula);

        if (!matricula) {
            return res.status(404).json({ message: 'Matrícula no encontrada' });
        }

        return res.status(200).json(matricula);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la matrícula', error: error.message });
    }
};

/**
 * Obtiene todas las matrículas o filtra por código de matrícula.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta JSON con las matrículas encontradas o un mensaje de error.
 */
export const getMatriculas = async (req, res) => {
    try {
        const { cod_matricula } = req.query;

        let whereClause = {};
        if (cod_matricula) {
            whereClause = { cod_matricula };
        }

        const matriculas = await Matricula.findAll({ where: whereClause });

        return res.status(200).json(matriculas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las matrículas', error: error.message });
    }
};

/**
 * Actualiza una matrícula existente.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta JSON con la matrícula actualizada o un mensaje de error.
 */
export const updateMatricula = async (req, res) => {
    try {
        const { cod_matricula } = req.params;
        const { cod_periodo, cod_curso, cod_estudiante } = req.body;

        const matricula = await Matricula.findByPk(cod_matricula);

        if (!matricula) {
            return res.status(404).json({ message: 'Matrícula no encontrada' });
        }

        // Actualiza los campos de la matrícula
        matricula.cod_periodo = cod_periodo || matricula.cod_periodo;
        matricula.cod_curso = cod_curso || matricula.cod_curso;
        matricula.cod_estudiante = cod_estudiante || matricula.cod_estudiante;

        await matricula.save();

        return res.status(200).json(matricula);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la matrícula', error: error.message });
    }
};

/**
 * Elimina una matrícula por su código.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Respuesta JSON con un mensaje de éxito o un mensaje de error.
 */
export const deleteMatricula = async (req, res) => {
    try {
        const { cod_matricula } = req.params;

        const matricula = await Matricula.findByPk(cod_matricula);

        if (!matricula) {
            return res.status(404).json({ message: 'Matrícula no encontrada' });
        }

        await matricula.destroy();

        return res.status(200).json({ message: 'Matrícula eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la matrícula', error: error.message });
    }
};