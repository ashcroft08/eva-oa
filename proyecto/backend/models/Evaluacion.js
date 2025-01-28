import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Pregunta } from './Pregunta.js';
import { Resultado } from './Resultado.js';

export const Evaluacion = sequelize.define('Evaluacion', {
    cod_evaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    fecha_apertura: {
        type: DataTypes.DATE,
    },
    fecha_cierra: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'evaluaciones',
    timestamps: true,
});

Evaluacion.hasMany(Pregunta, { foreignKey: 'cod_evaluacion' });
Pregunta.belongsTo(Evaluacion, { foreignKey: 'cod_evaluacion' });

Evaluacion.hasMany(Resultado, { foreignKey: 'cod_evaluacion' });
Resultado.belongsTo(Evaluacion, { foreignKey: 'cod_evaluacion' });