import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Opcion = sequelize.define('Opcion', {
    cod_opcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_pregunta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'preguntas',
            key: 'cod_preguntas',
        },
    },
    opcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    correcta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'opciones',
    timestamps: false,
});
