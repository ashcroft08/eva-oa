import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Resultado = sequelize.define('Resultado', {
    cod_resultado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_evaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'evaluaciones',
            key: 'cod_evaluacion',
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
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'cod_usuario',
        },
    },
    calificacion: {
        type: DataTypes.FLOAT,
    },
    fecha_finalizacion: {
        type: DataTypes.DATE,
    },
    hora_realizacion: {
        type: DataTypes.TIME,
    },
}, {
    tableName: 'resultados',
    timestamps: true,
});
