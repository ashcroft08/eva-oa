// controllers/MateriaController.js
import { Curso } from '../models/Curso.js';
// controllers/MateriaController.js
import { Materia } from "../models/Materia.js";
import { Op } from 'sequelize';

export const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll({
            include: Materia
        });
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMaterias = async (req, res) => {
    try {
        const materias = await Materia.findAll({
            include: [{
                model: Curso,
                attributes: ['nombre_curso', 'paralelo']
            }]
        });
        return res.status(200).json(materias);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createMateria = async (req, res) => {
    try {
        const { nombre_materia, cod_curso } = req.body;

        // Verificar si el curso existe
        const cursoExistente = await Curso.findByPk(cod_curso);
        if (!cursoExistente) {
            return res.status(404).json({ errors: ['El curso especificado no existe'] });
        }

        // Verificar si la materia ya existe en el mismo curso
        const materiaExistente = await Materia.findOne({
            where: {
                nombre_materia,
                cod_curso
            }
        });

        if (materiaExistente) {
            return res.status(400).json({ errors: ['La materia ya existe en este curso'] });
        }

        const nuevaMateria = await Materia.create({
            nombre_materia,
            cod_curso
        });

        return res.status(201).json(nuevaMateria);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateMateria = async (req, res) => {
    try {
        const { cod_materia } = req.params;
        const { nombre_materia, cod_curso } = req.body;

        const materia = await Materia.findByPk(cod_materia);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Verificar nuevo curso
        const nuevoCurso = await Curso.findByPk(cod_curso);
        if (!nuevoCurso) {
            return res.status(404).json({ message: 'El nuevo curso no existe' });
        }

        // Verificar nombre único en el curso
        const materiaExistente = await Materia.findOne({
            where: {
                nombre_materia,
                cod_curso,
                cod_materia: { [Op.ne]: cod_materia }
            }
        });

        if (materiaExistente) {
            return res.status(400).json({ errors: ['La materia ya existe en este curso'] });
        }

        materia.nombre_materia = nombre_materia;
        materia.cod_curso = cod_curso;
        await materia.save();

        return res.status(200).json(materia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMateria = async (req, res) => {
    try {
        const { cod_materia } = req.params;

        const materia = await Materia.findByPk(cod_materia);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        await materia.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMateria = async (req, res) => {
    try {
        const { cod_materia } = req.params;

        const materia = await Materia.findByPk(cod_materia, {
            include: [{
                model: Curso,
                attributes: ['nombre_curso', 'paralelo']
            }]
        });

        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        return res.json(materia);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};