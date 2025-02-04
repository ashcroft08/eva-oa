import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Emparejamiento } from './Emparejamiento.js';

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
            model: 'pregunta',
            key: 'cod_pregunta',
        },
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    es_correcta: { // Para opción múltiple y verdadero/falso
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    campo_emparejado: { // Para tipo "emparejar" (ej: "A-1", "B-2")
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'opcion',
    timestamps: false,
});

Opcion.hasMany(Emparejamiento, { foreignKey: 'opcion_id' });
Opcion.hasMany(Emparejamiento, { foreignKey: 'emparejado_id' });
