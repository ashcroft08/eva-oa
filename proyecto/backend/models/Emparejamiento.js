import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Pregunta } from './Pregunta.js'; // ✅ Importar solo Pregunta

export const Emparejamiento = sequelize.define('Emparejamiento', {
    cod_emparejamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_pregunta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pregunta',
            key: 'cod_pregunta',
        },
    },
    opcion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'opcion',
            key: 'cod_opcion',
        },
    },
    emparejado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'opcion',
            key: 'cod_opcion',
        },
    }
}, {
    tableName: 'emparejamiento',
    timestamps: false,
});