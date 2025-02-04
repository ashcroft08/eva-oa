import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const MensajeWiki = sequelize.define('MensajeWiki', {
    cod_mensajewiki: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_wiki: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'wiki',
            key: 'cod_wiki',
        },
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
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
    tableName: 'mensaje_wiki',
    timestamps: true,
});
