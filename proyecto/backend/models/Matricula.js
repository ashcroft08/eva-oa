import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Matricula = sequelize.define('Matricula', {
    cod_matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_periodo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'periodo', // Hace referencia directamente al modelo Periodo
            key: 'cod_periodo', // Clave referenciada
        },
    },
    cod_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'curso',
            key: 'cod_curso',
        },
    },
    cod_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'cod_usuario',
        },
    },
}, {
    tableName: 'matricula',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['cod_usuario', 'cod_curso','cod_periodo']
        }
    ]
});