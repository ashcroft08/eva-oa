import { Usuario } from "../models/Usuario.js";

export const getUser = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.cod_usuario);

        // Si no se encuentra el usuario, devolver error 404
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Devolver la información del usuario
        return res.status(200).json(user);
    } catch (error) {
        // Incluir detalles del error en el manejo
        return res.status(500).json({ message: "Error al obtener el usuario.", error: error.message });
    }
};

export const getUsersAdmin = async (req, res) => {
    try {
        // Busca todos los usuarios con cod_rol igual a 1
        const admins = await Usuario.findAll({
            where: {
                cod_rol: 2
            }
        });

        // Devuelve los usuarios encontrados en formato JSON
        res.json(admins);
    } catch (error) {
        // Manejo de errores: devuelve un estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
};

export const getUsersTeacher = async (req, res) => {
    try {
        const teachers = await Usuario.findAll({
            where: {
                cod_rol: 3
            }
        });
        res.json(teachers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsersStudent = async (req, res) => {
    try {
        const students = await Usuario.findAll({
            where: {
                cod_rol: 4
            }
        });
        res.json(students);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { cod_usuario } = req.params;

        const currentUserId = req.user.cod_usuario; // Usuario logueado (del token)

        // Verificar si el usuario logueado intenta eliminar su propia cuenta
        if (parseInt(cod_usuario) === currentUserId) {
            return res.status(403).json({
                message: "No puedes eliminar tu propia cuenta mientras estás logueado.",
            });
        }

        // Busca al usuario por su código
        const deletedUser = await Usuario.destroy({
            where: { cod_usuario: cod_usuario },
        });

        // Verifica si el usuario existía
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Devuelve un estado 204 sin contenido
        return res.sendStatus(204);
    } catch (error) {
        // Manejo de errores
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { cod_usuario } = req.params; // código del usuario
        const { cedula, nombres, apellidos, email } = req.body;
        const currentUserId = req.user.cod_usuario; // Usuario logueado (del token)

        // Verificar si el usuario logueado intenta actualizar su propia cuenta
        if (parseInt(cod_usuario) === currentUserId) {
            return res.status(403).json({
                message: "No puedes actualizar tu propia cuenta mientras estás logueado.",
            });
        }

        // Buscar al usuario por su código
        const user = await Usuario.findByPk(cod_usuario);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Validar si hay conflictos de correo o cédula
        const [emailConflict, cedulaConflict] = await Promise.all([
            email && email !== user.email ? Usuario.findOne({ where: { email } }) : null,
            cedula && cedula !== user.cedula ? Usuario.findOne({ where: { cedula } }) : null,
        ]);

        if (emailConflict) {
            return res.status(400).json({ message: "Ya existe un usuario con este correo." });
        }

        if (cedulaConflict) {
            return res.status(400).json({ message: "Ya existe un usuario con esta cédula." });
        }

        // Construir un objeto con los campos a actualizar
        const updates = {};
        if (cedula) updates.cedula = cedula;
        if (nombres) updates.nombres = nombres;
        if (apellidos) updates.apellidos = apellidos;
        if (email) updates.email = email;

        // Actualizar el usuario
        await user.update(updates);

        // Responder con los datos actualizados
        res.status(200).json({
            cod_usuario: user.cod_usuario,
            cod_rol: user.cod_rol, // No se actualiza, pero se incluye en la respuesta
            cedula: user.cedula,
            nombres: user.nombres,
            apellidos: user.apellidos,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


