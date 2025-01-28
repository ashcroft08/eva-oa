import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Opcion } from './Opcion.js';

export const Pregunta = sequelize.define('Pregunta', {
    cod_preguntas: {
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
    cod_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pregunta: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    puntaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'preguntas',
    timestamps: true,
});

Pregunta.hasMany(Opcion, { foreignKey: 'cod_pregunta' });
Opcion.belongsTo(Pregunta, { foreignKey: 'cod_pregunta' });