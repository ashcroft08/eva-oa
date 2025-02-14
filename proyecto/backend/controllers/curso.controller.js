import { Matricula } from '../models/Matricula.js';
import { Curso } from '../models/Curso.js';
import { Materia } from '../models/Materia.js';
import { DocenteMateria } from '../models/DocenteMateria.js';
import { Usuario } from '../models/Usuario.js';
import { Op } from 'sequelize';

export const getCursos = async (req, res) => {
    try {
        // Obtener todos los cursos ordenados por cod_curso de forma ascendente
        const cursos = await Curso.findAll({
            order: [['cod_curso', 'ASC']] // Ordenar por cod_curso en orden ascendente
        });
        return res.status(200).json(cursos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createCurso = async (req, res) => {
    try {
        const { nombre_curso, paralelo } = req.body;

        // Verificar si ya existe un curso con el mismo paralelo
        const existingCurso = await Curso.findOne({ where: { nombre_curso } });
        const existingParalelo = await Curso.findOne({ where: { paralelo } });

        if (existingCurso && existingParalelo) {
            return res.status(400).json(['Ya existe el curso con el mismo paralelo.']);
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

        // Verificar si ya existe un curso con el mismo paralelo, excluyendo el curso actual
        const existingParalelo = await Curso.findOne({
            where: {
                paralelo,
                cod_curso: { [Op.ne]: cod_curso } // Excluye el curso actual
            }
        });

        const existingCurso = await Curso.findOne({
            where: {
                nombre_curso,
                cod_curso: { [Op.ne]: cod_curso } // Excluye el curso actual
            }
        });

        if (existingCurso && existingParalelo) {
            return res.status(400).json(['Ya existe el curso con el mismo paralelo.']);
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

        // Asegúrate que el modelo tenga cod_curso como PK
        const curso = await Curso.findByPk(cod_curso);

        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        return res.json(curso);
    } catch (error) {
        console.error("Error en getCurso:", error); // Agrega logging
        return res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message // Muestra el error real
        });
    }
};

// Controlador para obtener los nombres de los cursos y sus materias por cod_docente
export const obtenerCursosPorDocente = async (req, res) => {
    const { cod_docente } = req.params; // Suponiendo que el cod_docente se pasa como parámetro en la URL

    try {
        const cursos = await Curso.findAll({
            attributes: ['nombre_curso'], // Solo queremos el nombre del curso
            include: [
                {
                    model: Materia,
                    required: true, // INNER JOIN
                    attributes: ['nombre_materia'], // Solo queremos el nombre de la materia
                    include: [
                        {
                            model: DocenteMateria,
                            required: true, // INNER JOIN
                            where: { cod_docente: cod_docente }, // Filtramos por cod_docente
                            attributes: [] // No necesitamos atributos de DocenteMateria
                        }
                    ]
                }
            ]
        });

        // Verificamos si se encontraron cursos
        if (cursos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cursos para el docente especificado.' });
        }

        // Mapeamos los resultados para obtener solo el nombre del curso y los nombres de las materias
        const resultado = cursos.map(curso => ({
            nombre_curso: curso.nombre_curso,
            materias: curso.Materia.map(materia => materia.nombre_materia) // Extraemos solo el nombre de la materia
        }));

        // Devolvemos los cursos encontrados
        return res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const obtenerEstudiantesPorDocente = async (req, res) => {
    const { cod_docente } = req.params; // Obtén el código del docente desde los parámetros de la ruta

    try {
        const estudiantes = await Usuario.findAll({
            attributes: ['nombres', 'apellidos'],
            include: [
                {
                    model: Matricula,
                    required: true, // Filtra solo los estudiantes que tienen matrícula
                    include: [
                        {
                            model: Curso,
                            required: true, // Filtra solo los cursos relacionados
                            include: [
                                {
                                    model: Materia,
                                    required: true, // Filtra solo las materias relacionadas
                                    include: [
                                        {
                                            model: DocenteMateria,
                                            where: { cod_docente: cod_docente }, // Filtra por el código del docente
                                            required: true, // Filtra solo las asignaciones de docente
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            distinct: true, // Evita duplicados
        });

        const nombresApellidos = estudiantes.map(estudiante => ({
            nombres: estudiante.nombres,
            apellidos: estudiante.apellidos,
        }));

        res.status(200).json(nombresApellidos);
    } catch (error) {
        console.error('Error al obtener los nombres y apellidos de los estudiantes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};