import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const MensajeForo = sequelize.define('MensajeForo', {
    cod_mensaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_foro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'foro',
            key: 'cod_foro',
        },
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
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
    tableName: 'mensaje_foro',
    timestamps: true,
});
