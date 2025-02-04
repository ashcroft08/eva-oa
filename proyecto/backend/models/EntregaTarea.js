import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const EntregaTarea = sequelize.define('EntregaTarea', {
    cod_entrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_tarea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tarea',
            key: 'cod_tarea',
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
    archivo_entrega: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    observaciones: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'entrega_tarea',
    timestamps: true,
});
