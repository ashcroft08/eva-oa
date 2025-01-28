import { Curso } from "../models/Curso.js";

export const getCursos = async (req, res) => {
    try {
        // Obtener todos los cursos
        const cursos = await Curso.findAll();
        return res.status(200).json(cursos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createCurso = async (req, res) => {
    try {
        const { nombre_curso, paralelo } = req.body;

        // Verificar si ya existe un curso con el mismo paralelo
        const existingCurso = await Curso.findOne({ where: { paralelo } });

        if (existingCurso) {
            return res.status(400).json({ message: 'Ya existe un curso con el mismo paralelo.' });
        }

        // Si no existe, crear el nuevo curso
        const newCurso = await Curso.create({
            nombre_curso,
            paralelo,
        });

        return res.status(201).json(newCurso);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletedCurso = async (req, res) => {
    try {
        const { cod_curso } = req.params;

        // Buscar el curso por cod_curso
        const curso = await Curso.findByPk(cod_curso);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }

        // Eliminar el curso
        await curso.destroy();
        return res.status(204).send(); // No content
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateCurso = async (req, res) => {
    try {
        const { cod_curso } = req.params;
        const { nombre_curso, paralelo } = req.body;

        // Buscar el curso por cod_curso
        const curso = await Curso.findByPk(cod_curso);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }

        // Actualizar el curso
        curso.nombre_curso = nombre_curso;
        curso.paralelo = paralelo;
        await curso.save();

        return res.status(200).json(curso);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCurso = async (req, res) => {
    try {
        const { cod_curso } = req.params;

        // Buscar el curso por cod_curso
        const curso = await Curso.findByPk(cod_curso);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado.' });
        }

        return res.status(200).json(curso);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};