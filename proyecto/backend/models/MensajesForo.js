import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const MensajesForo = sequelize.define('MensajesForo', {
    cod_mensaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_materia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'materias',
            key: 'cod_materia',
        },
    },
    cod_foro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'foros',
            key: 'cod_foro',
        },
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'cod_usuario',
        },
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    puntaje: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'mensajes_foro',
    timestamps: true,
});
