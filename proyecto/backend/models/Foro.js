import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { MensajeForo } from './MensajeForo.js';

export const Foro = sequelize.define('Foro', {
    cod_foro: {
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
        allowNull: true,
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
    tableName: 'foro',
    timestamps: true,
});

//Relaciones
Foro.hasMany(MensajeForo, { foreignKey: 'cod_foro' });
MensajeForo.belongsTo(Foro, { foreignKey: 'cod_foro' });