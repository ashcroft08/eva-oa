import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { RespuestaEstudiante } from './RespuestaEstudiante.js';

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
            model: 'evaluacion',
            key: 'cod_evaluacion',
        },
    },
    cod_estudiante: {  // Nombre descriptivo (FK a usuario con rol estudiante)
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'cod_usuario',
        },
    },
    calificacion: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
            max: 100
        }
    },
    fecha_inicio: {  // Campo nuevo para tracking
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_finalizacion: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'resultado',
    timestamps: false,  // No necesarios si usas fechas manuales
});

Resultado.hasMany(RespuestaEstudiante, { foreignKey: 'cod_resultado' });