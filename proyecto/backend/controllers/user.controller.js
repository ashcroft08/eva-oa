import { Op } from 'sequelize'; // Asegúrate de importar los operadores de Sequelize
import { Usuario } from "../models/Usuario.js";
import bcrypt from 'bcryptjs';

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
        // Obtener el ID del usuario logueado desde req.user
        const userId = req.user.cod_usuario;

        // Buscar todos los usuarios con cod_rol igual a 2, excluyendo al usuario logueado
        const admins = await Usuario.findAll({
            where: {
                cod_rol: 2,
                cod_usuario: {
                    [Op.ne]: userId // Excluir al usuario logueado
                }
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
        res.status(201).json({
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

export const updateUserPassword = async (req, res) => {
    try {
        const { cod_usuario } = req.params; // Código del usuario
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Validar que las nuevas contraseñas coincidan
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden." });
        }

        // Validar la longitud de la nueva contraseña
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
        }

        // Buscar al usuario por su código
        const user = await Usuario.findByPk(cod_usuario);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar la contraseña actual
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta. Intente de nuevo." });
        }

        // Verificar que la nueva contraseña no sea igual a la actual
        const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
        if (isNewPasswordSame) {
            return res.status(400).json(["La nueva contraseña no puede ser igual a la actual."]);
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        await user.update({ password: hashedPassword });

        // Responder con un mensaje de éxito
        res.status(201).json({
            cod_usuario: user.cod_usuario,
            message: "Contraseña actualizada correctamente.",
        });
    } catch (error) {
        console.error("Error en updateUserPassword:", error); // Imprime el error en la consola
        res.status(500).json({ message: "Error al actualizar la contraseña. Por favor, inténtelo de nuevo." });
    }
};