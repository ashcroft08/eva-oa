import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Progreso = sequelize.define('Progreso', {
    cod_progreso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'cod_usuario',
        },
    },
    cod_materia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'materias',
            key: 'cod_materia',
        },
    },
    progreso_porcentaje: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'progresos',
    timestamps: true,
});
