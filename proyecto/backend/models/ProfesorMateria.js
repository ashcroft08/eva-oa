import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const ProfesorMateria = sequelize.define('ProfesorMateria', {
    cod_asignacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_profesor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'cod_usuario'
        }
    },
    cod_materia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'materia',
            key: 'cod_materia'
        }
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Registra cuándo se asignó
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Para "despedirlos" sin borrar registros
    }
}, {
    tableName: 'profesor_materia',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['cod_profesor', 'cod_materia'] // Evita duplicados activos
        }
    ]
});