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
            model: 'materia',
            key: 'cod_materia',
        },
    },
    cod_docente: {  // Nombre más descriptivo (FK a usuario con rol profesor)
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'cod_usuario',
        },
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    fecha_apertura: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_cierre: {  // Corrección de "cierra" a "cierre"
        type: DataTypes.DATE,
        allowNull: false,
    },
    duracion_minutos: {  // Nuevo campo importante
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    tableName: 'evaluacion',
    timestamps: true,
});

Evaluacion.hasMany(Pregunta, { foreignKey: 'cod_evaluacion' });
Pregunta.belongsTo(Evaluacion, { foreignKey: 'cod_evaluacion' });

Evaluacion.hasMany(Resultado, { foreignKey: 'cod_evaluacion' });
Resultado.belongsTo(Evaluacion, { foreignKey: 'cod_evaluacion' });