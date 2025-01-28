import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { RealizacionObjetoAprendizaje } from './RealizacionObjetoAprendizaje.js';

export const ObjetoAprendizaje = sequelize.define('ObjetoAprendizaje', {
    cod_oa: {
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
    contenido_url: {
        type: DataTypes.STRING,
    },
    tipo: {
        type: DataTypes.STRING,
    },
    puntaje_total: {
        type: DataTypes.INTEGER,
    },
    fecha_apertura: {
        type: DataTypes.DATE,
    },
    fecha_cierre: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'objetos_aprendizaje',
    timestamps: true,
});

ObjetoAprendizaje.hasMany(RealizacionObjetoAprendizaje, { foreignKey: 'cod_oa' });
RealizacionObjetoAprendizaje.belongsTo(ObjetoAprendizaje, { foreignKey: 'cod_oa' });