import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Pregunta } from "./Pregunta.js";

export const TipoPregunta = sequelize.define('TipoPregunta', {
    cod_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ej: "opcion_multiple", "completar", "emparejar"
    },
    config: { // Configuración específica (ej: número de opciones, pares para emparejar)
        type: DataTypes.JSONB,
        defaultValue: {}
    }
}, {
    tableName: 'tipo_pregunta',
    timestamps: false,
});