import { ConfiguracionToken } from '../models/ConfiguracionToken.js';

// Función para obtener la configuración
export async function obtenerConfiguracion() {
    try {
        const config = await ConfiguracionToken.findOne({
            order: [['cod_token', 'DESC']], // Obtener el último registro
        });

        // Si no hay configuración, devolver un valor predeterminado
        if (!config) {
            return { expiresIn: '1h' }; // Valor predeterminado
        }

        return config;
    } catch (error) {
        console.error('Error al obtener la configuración del token:', error);
        throw error; // Lanzar el error para manejarlo en createAccessToken
    }
}

// Función para obtener la configuración y enviarla como respuesta HTTP
export async function obtenerConfiguracionToken(req, res) {
    try {
        const config = await obtenerConfiguracion();
        res.json(config); // Enviar la configuración como respuesta HTTP
    } catch (error) {
        console.error('Error al obtener la configuración del token:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Función para actualizar la configuración
export async function actualizarConfiguracionToken(req, res) {
    const { expiresIn } = req.body;

    try {
        // Buscar el último registro
        const config = await ConfiguracionToken.findOne({
            order: [['cod_token', 'DESC']], // Obtener el último registro
        });

        // Si no se encuentra el registro, devolver un error
        if (!config) {
            return res.status(404).json({ message: 'Configuración no encontrada' });
        }

        // Actualizar el campo expiresIn
        config.expiresIn = expiresIn;
        config.updatedAt = new Date(); // Actualizar la fecha de modificación

        // Guardar los cambios en la base de datos
        await config.save();

        // Devolver la configuración actualizada
        res.json(config);
    } catch (error) {
        console.error('Error al actualizar la configuración del token:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}