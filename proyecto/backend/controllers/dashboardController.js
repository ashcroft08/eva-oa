import { Usuario } from '../models/Usuario.js';
import { Materia } from '../models/Materia.js';
import { Curso } from "../models/Curso.js";
import { Periodo } from '../models/Periodo.js';

export const getDashboardData = async (req, res) => {
    try {
        // Obtener el total de administradores, docentes y estudiantes
        const totalAdministradores = await Usuario.count({ where: { cod_rol: 2 } });
        const totalDocentes = await Usuario.count({ where: { cod_rol: 3 } });
        const totalEstudiantes = await Usuario.count({ where: { cod_rol: 4 } });

        // Obtener el último registro de cada tipo de usuario
        const ultimoAdministrador = await Usuario.findOne({
            where: { cod_rol: 2 },
            order: [['createdAt', 'DESC']],
            attributes: ['createdAt']
        });
        const ultimoDocente = await Usuario.findOne({
            where: { cod_rol: 3 },
            order: [['createdAt', 'DESC']],
            attributes: ['createdAt']
        });
        const ultimoEstudiante = await Usuario.findOne({
            where: { cod_rol: 4 },
            order: [['createdAt', 'DESC']],
            attributes: ['createdAt']
        });

        // Obtener el total de cursos y materias
        const totalCursos = await Curso.count();
        const totalMaterias = await Materia.count();

        // Obtener el período actual
        const periodoActual = await Periodo.findOne({
            order: [['fecha_inicio', 'DESC']],
            attributes: ['anio_lectivo']
        });

        // Enviar la respuesta con los datos obtenidos
        res.json({
            totalAdministradores,
            totalDocentes,
            totalEstudiantes,
            ultimoAdministrador: ultimoAdministrador ? ultimoAdministrador.createdAt : null,
            ultimoDocente: ultimoDocente ? ultimoDocente.createdAt : null,
            ultimoEstudiante: ultimoEstudiante ? ultimoEstudiante.createdAt : null,
            totalCursos,
            totalMaterias,
            periodoActual: periodoActual ? periodoActual.anio_lectivo : null
        });
    } catch (error) {
        console.error('Error al obtener los datos del dashboard:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};