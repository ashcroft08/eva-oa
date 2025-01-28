import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { MensajesWikis } from './MensajesWikis.js';

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
    tableName: 'wikis',
    timestamps: true,
});

Wiki.hasMany(MensajesWikis, { foreignKey: 'cod_wiki' });
MensajesWikis.belongsTo(Wiki, { foreignKey: 'cod_wiki' });