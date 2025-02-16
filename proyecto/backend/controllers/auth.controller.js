import { Usuario } from "../models/Usuario.js";
import { RecoverPassword } from '../models/RecoverPassword.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import { sendEmail } from '../utils/mailer.js';
import crypto from 'crypto';
import { Op } from 'sequelize'; // <-- Agregar este import

export const register = async (req, res) => {
    try {
        const { cedula, nombres, apellidos, email, password, confirmPassword, cod_rol } = req.body;

        const codRolNumber = parseInt(cod_rol, 10);
        if (isNaN(codRolNumber) || codRolNumber < 2 || codRolNumber > 4) {
            return res.status(400).json(["Rol inválido"]);
        }

        if (password !== confirmPassword) {
            return res.status(400).json(["Las contraseñas no coinciden"]);
        }

        // Límite de administradores
        if (codRolNumber === 2) {
            const adminCount = await Usuario.count({ where: { cod_rol: 2 } });
            if (adminCount >= 3) return res.status(400).json(["Límite de administradores alcanzado"]);
        }

        // Configurar condiciones de búsqueda
        const searchConditions = [];

        if (codRolNumber === 4) {
            // Estudiantes: cédula y email únicos globales
            searchConditions.push({ cedula }, { email });
        } else {
            // Admin/Docente: cédula y email únicos por rol
            searchConditions.push(
                { cedula, cod_rol: codRolNumber },
                { email, cod_rol: codRolNumber }
            );
        }

        // Buscar registros existentes
        const existingUser = await Usuario.findOne({
            where: {
                [Op.or]: searchConditions
            }
        });

        if (existingUser) {
            if (existingUser.cod_rol === codRolNumber) {
                if (existingUser.cedula === cedula) {
                    return res.status(400).json(["Cédula ya registrada en este rol"]);
                }
                if (existingUser.email === email) {
                    return res.status(400).json(["Email ya registrado en este rol"]);
                }
            }
            if (codRolNumber === 4 && existingUser.cedula === cedula) {
                return res.status(400).json(["Cédula ya registrada (estudiante)"]);
            }
            if (codRolNumber === 4 && existingUser.email === email) {
                return res.status(400).json(["Email ya registrado (estudiante)"]);
            }
        }

        // Crear nuevo usuario
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({
            cod_rol: codRolNumber,
            cedula,
            nombres,
            apellidos,
            email,
            password: passwordHash,
        });

        res.status(201).json({
            cod_usuario: newUser.cod_usuario,
            cod_rol: newUser.cod_rol,
            cedula: newUser.cedula,
            nombres: newUser.nombres,
            apellidos: newUser.apellidos,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Iniciando proceso de login para:', email);

        // Buscar usuario por email
        const userFound = await Usuario.findOne({ where: { email } });
        if (!userFound) {
            console.log('Usuario no encontrado:', email);
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        console.log('Usuario encontrado:', userFound.cod_usuario);

        // Verificar si la cuenta está bloqueada
        if (userFound.is_locked) {
            const lockDuration = 15 * 60 * 1000; // 15 minutos en milisegundos
            const currentTime = new Date();
            const lockTime = new Date(userFound.lock_time);

            // Verificar si han pasado 15 minutos desde el bloqueo
            if (currentTime - lockTime < lockDuration) {
                console.log('Cuenta bloqueada para:', email);
                return res.status(403).json({ message: "Cuenta bloqueada. Intenta de nuevo más tarde." });
            } else {
                // Restablecer el estado de bloqueo
                userFound.is_locked = false;
                userFound.login_attempts = 0;
                userFound.lock_time = null;
                await userFound.save();
                console.log('Cuenta desbloqueada para:', email);
            }
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            userFound.login_attempts += 1; // Incrementar intentos fallidos

            // Verificar si se alcanzaron los 5 intentos
            if (userFound.login_attempts >= 5) {
                userFound.is_locked = true; // Bloquear cuenta
                userFound.lock_time = new Date(); // Establecer tiempo de bloqueo
            }

            await userFound.save(); // Guardar cambios en la base de datos
            console.log('Contraseña incorrecta para:', email);
            return res.status(400).json({ message: "Contraseña incorrecta. Intentos restantes: " + (5 - userFound.login_attempts) });
        }

        // Si la contraseña es correcta, restablecer intentos y estado de bloqueo
        userFound.login_attempts = 0;
        userFound.is_locked = false;
        userFound.lock_time = null;
        await userFound.save();
        console.log('Contraseña correcta para:', email);

        // Generar token
        const token = await createAccessToken({ cod_usuario: userFound.cod_usuario });
        console.log('Token generado para:', email);

        // Configurar cookie
        res.cookie("token", token);

        // Responder con datos del usuario
        res.json({
            cod_usuario: userFound.cod_usuario,
            cod_rol: userFound.cod_rol,
            cedula: userFound.cedula,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        try {
            const userFound = await Usuario.findByPk(user.cod_usuario); // Usar findByPk con Sequelize
            if (!userFound) return res.sendStatus(401);

            return res.json({
                cod_usuario: userFound.cod_usuario,
                cod_rol: userFound.cod_rol, // Rol del usuario
                nombres: userFound.nombres,
                apellidos: userFound.apellidos,
                email: userFound.email,
            });

        } catch (err) {
            return res.sendStatus(500); // Maneja errores del servidor
        }
    });
};

export const sendRecoveryCode = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Generar un código aleatorio (por ejemplo, un código hexadecimal de 6 caracteres)
        const code = crypto.randomBytes(3).toString('hex').toUpperCase();
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // El código expira en 3 minutos

        // Crear el registro de recuperación de contraseña
        await RecoverPassword.create({
            code,
            expiresAt,
            cod_usuario: user.cod_usuario,  // Conexión con el usuario mediante 'cod_usuario'
        });

        // Enviar el código por correo electrónico utilizando Resend
        const message = `Tu código de recuperación es: <strong>${code}</strong>. Este código expirará en 3 minutos.`;
        await sendEmail(email, 'Código de recuperación de contraseña', message);

        res.json({ message: 'Código de recuperación enviado a tu correo electrónico' });
    } catch (error) {
        console.error('Error en el proceso de recuperación de contraseña:', error);
        res.status(500).json({ message: error.message });
    }
};

// controllers/auth.controller.js
export const validateRecoveryCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar el código de recuperación en la base de datos
        const recoveryRecord = await RecoverPassword.findOne({
            where: { cod_usuario: user.cod_usuario, code },
        });

        // Verificar si el código es válido y no ha expirado
        if (!recoveryRecord) {
            return res.status(400).json({ message: 'Código incorrecto' });
        }

        if (new Date() > new Date(recoveryRecord.expiresAt)) {
            return res.status(400).json({ message: 'El código ha expirado' });
        }

        res.json({ message: 'Código válido, puedes restablecer tu contraseña' });
    } catch (error) {
        console.error('Error al validar el código:', error);
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar el código de recuperación en la base de datos
        const recoveryRecord = await RecoverPassword.findOne({
            where: { cod_usuario: user.cod_usuario, code },
        });

        // Verificar si el código es válido y no ha expirado
        if (!recoveryRecord) {
            return res.status(400).json({ message: 'Código incorrecto' });
        }

        if (new Date() > new Date(recoveryRecord.expiresAt)) {
            return res.status(400).json({ message: 'El código ha expirado' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        await Usuario.update(
            { password: hashedPassword },
            { where: { email } }
        );

        // Eliminar el registro de recuperación, ya que se ha completado
        await recoveryRecord.destroy();

        res.json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: error.message });
    }
};
