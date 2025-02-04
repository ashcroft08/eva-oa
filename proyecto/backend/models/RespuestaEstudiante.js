import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const RespuestaEstudiante = sequelize.define('RespuestaEstudiante', {
    cod_respuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_resultado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'resultado',
            key: 'cod_resultado',
        },
    },
    cod_pregunta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pregunta',
            key: 'cod_pregunta',
        },
    },
    texto_respuesta: { // Para "completar"
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cod_opcion_seleccionada: { // Para opción múltiple/verdadero-falso
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'opcion',
            key: 'cod_opcion',
        },
    },
    cod_emparejamiento: { // Para "emparejar" (guarda la combinación del estudiante)
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'emparejamiento',
            key: 'cod_emparejamiento',
        },
    }
}, {
    tableName: 'respuesta_estudiante',
    timestamps: false,
});