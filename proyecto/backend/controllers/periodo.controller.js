import { Periodo } from "../models/Periodo";

/**
 * Obtiene todos los periodos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const getPeriodos = async (req, res) => {
    try {
        const periodos = await Periodo.findAll();
        return res.status(200).json(periodos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Obtiene un periodo por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const getPeriodo = async (req, res) => {
    try {
        const { id } = req.params;
        const periodo = await Periodo.findByPk(id);

        if (!periodo) {
            return res.status(404).json({ message: 'Periodo no encontrado.' });
        }

        return res.status(200).json(periodo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Crea un nuevo periodo.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const createPeriodo = async (req, res) => {
    try {
        const { anio_lectivo, fecha_inicio, fecha_fin } = req.body;

        // Verificar si ya existe un periodo con el mismo año lectivo, fecha de inicio o fecha de fin
        const existingPeriodo = await Periodo.findOne({
            where: {
                [Op.or]: [
                    { anio_lectivo },
                    { fecha_inicio },
                    { fecha_fin }
                ]
            }
        });

        if (existingPeriodo) {
            return res.status(400).json({ message: 'Ya existe un periodo con los mismos datos.' });
        }

        const newPeriodo = await Periodo.create({
            anio_lectivo,
            fecha_inicio,
            fecha_fin,
        });

        return res.status(201).json(newPeriodo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Actualiza un periodo existente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const updatePeriodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { anio_lectivo, fecha_inicio, fecha_fin } = req.body;

        const periodo = await Periodo.findByPk(id);

        if (!periodo) {
            return res.status(404).json({ message: 'Periodo no encontrado.' });
        }

        // Verificar si los nuevos datos ya existen en otro periodo
        const existingPeriodo = await Periodo.findOne({
            where: {
                [Op.or]: [
                    { anio_lectivo },
                    { fecha_inicio },
                    { fecha_fin }
                ],
                id: { [Op.ne]: id } // Excluir el periodo actual de la verificación
            }
        });

        if (existingPeriodo) {
            return res.status(400).json({ message: 'Ya existe un periodo con los mismos datos.' });
        }

        periodo.anio_lectivo = anio_lectivo;
        periodo.fecha_inicio = fecha_inicio;
        periodo.fecha_fin = fecha_fin;

        await periodo.save();

        return res.status(200).json(periodo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Elimina un periodo existente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const deletePeriodo = async (req, res) => {
    try {
        const { id } = req.params;

        const periodo = await Periodo.findByPk(id);

        if (!periodo) {
            return res.status(404).json({ message: 'Periodo no encontrado.' });
        }

        await periodo.destroy();

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};