import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Opcion } from './Opcion.js';
import { TipoPregunta } from './TipoPregunta.js';
import { Emparejamiento } from './Emparejamiento.js';

export const Pregunta = sequelize.define('Pregunta', {
    cod_pregunta: {
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
    cod_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tipo_pregunta',
            key: 'cod_tipo',
        },
    },
    enunciado: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    puntaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 }
    },
    respuesta_texto: { // Solo para tipo "completar"
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'pregunta',
    timestamps: true,
});

Pregunta.belongsTo(TipoPregunta, { foreignKey: 'cod_tipo' });
TipoPregunta.hasMany(Pregunta, { foreignKey: 'cod_tipo' }); // ✅
Pregunta.hasMany(Opcion, { foreignKey: 'cod_pregunta' });
Pregunta.hasMany(Emparejamiento, { foreignKey: 'cod_pregunta' }); // ✅ Aquí se define