import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Rol } from './Rol.js'; // Importar Rol antes de las relaciones
import { Matricula } from './Matricula.js';
import { Materia } from './Materia.js';
import { ObjetoAprendizaje } from './ObjetoAprendizaje.js';
import { Tarea } from './Tarea.js';
import { Foro } from './Foro.js';
import { MensajeForo } from './MensajeForo.js';
import { Evaluacion } from './Evaluacion.js';
import { EntregaTarea } from './EntregaTarea.js';
import { Wiki } from './Wiki.js';
import { MensajeWiki } from './MensajeWiki.js';
import { Progreso } from './Progreso.js';
import { Resultado } from './Resultado.js';
import { RealizacionObjetoAprendizaje } from './RealizacionObjetoAprendizaje.js';
import { DocenteMateria } from "./DocenteMateria.js"
import bcrypt from 'bcrypt'; // Asegúrate de instalar bcrypt

export const Usuario = sequelize.define('Usuario', {
    cod_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rol', // Hace referencia directamente al modelo Rol
            key: 'cod_rol', // Clave referenciada
        },
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Inicialmente 0 intentos
    },
    is_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Inicialmente no bloqueado
    },
    lock_time: {
        type: DataTypes.DATE,
        allowNull: true, // Puede ser nulo si no está bloqueado
    },
}, {
    tableName: 'usuario', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});

// Relaciones
Usuario.hasMany(Matricula, { foreignKey: 'cod_usuario' });
Matricula.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

DocenteMateria.belongsTo(Usuario, { foreignKey: 'cod_profesor' });

Usuario.hasMany(Materia, { foreignKey: 'cod_usuario' });
Materia.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(ObjetoAprendizaje, { foreignKey: 'cod_usuario' });
ObjetoAprendizaje.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(Tarea, { foreignKey: 'cod_usuario' });
Tarea.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(Foro, { foreignKey: 'cod_usuario' });
Foro.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(MensajeForo, { foreignKey: 'cod_usuario' });
MensajeForo.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(Evaluacion, { foreignKey: 'cod_usuario' });
Evaluacion.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(EntregaTarea, { foreignKey: 'cod_usuario' });
EntregaTarea.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(Wiki, { foreignKey: 'cod_usuario' });
Wiki.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(MensajeWiki, { foreignKey: 'cod_usuario' });
MensajeWiki.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(Progreso, { foreignKey: 'cod_usuario' });
Progreso.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(Resultado, { foreignKey: 'cod_usuario' });
Resultado.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

Usuario.hasMany(RealizacionObjetoAprendizaje, { foreignKey: 'cod_usuario' });
RealizacionObjetoAprendizaje.belongsTo(Usuario, { foreignKey: 'cod_usuario' });

// Hook para crear un superusuario inicial (si no existe)
Usuario.afterSync(async () => {
    const superRol = await Rol.findOne({ where: { nombre_rol: 'Superusuario' } });
    if (superRol) {
        // Verificar si ya existe un usuario con el rol de Superusuario
        const existingUser = await Usuario.findOne({ where: { cod_rol: superRol.cod_rol } });

        if (!existingUser) {
            // Si no existe, crear el superusuario
            const usuario = await Usuario.create({
                cod_rol: superRol.cod_rol,
                cedula: '1234567890',
                nombres: 'Administrador',
                apellidos: 'Sistema',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('Admin08_*', 10), // Encriptar la contraseña
            });

            console.log('Superusuario creado:', usuario.toJSON());
        } else {
            console.log('Superusuario ya existe. No se realizaron cambios.');
        }
    } else {
        console.error('Rol Superusuario no encontrado.');
    }
});