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
            model: 'tareas',
            key: 'cod_tarea',
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
    tableName: 'entregas_tareas',
    timestamps: true,
});
