import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const MensajesWikis = sequelize.define('MensajesWikis', {
    cod_mensajewiki: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_wiki: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'wikis',
            key: 'cod_wiki',
        },
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
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ultima_edicion: {
        type: DataTypes.DATE,
    },
    puntaje: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'mensajes_wikis',
    timestamps: true,
});
