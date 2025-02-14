import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const DocenteMateria = sequelize.define('DocenteMateria', {
    cod_asignacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_docente: {
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
    tableName: 'docente_materia',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['cod_docente', 'cod_materia'] // Evita duplicados activos
        }
    ]
});