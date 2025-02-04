import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { MensajeWiki } from './MensajeWiki.js';

export const Wiki = sequelize.define('Wiki', {
    cod_wiki: {
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
    descripcion: {
        type: DataTypes.TEXT,
    },
    fecha_apertura: {
        type: DataTypes.DATE,
    },
    fecha_cierre: {
        type: DataTypes.DATE,
    },
    puntaje_total: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'wiki',
    timestamps: true,
});

Wiki.hasMany(MensajeWiki, { foreignKey: 'cod_wiki' });
MensajeWiki.belongsTo(Wiki, { foreignKey: 'cod_wiki' });