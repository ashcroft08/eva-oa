import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { EntregaTarea } from './EntregaTarea.js';


export const Tarea = sequelize.define('Tarea', {
    cod_tarea: {
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
    fecha_entrega: {
        type: DataTypes.DATE,
    },
    puntaje_total: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'tarea',
    timestamps: true,
});

Tarea.hasMany(EntregaTarea, { foreignKey: 'cod_tarea' });
EntregaTarea.belongsTo(Tarea, { foreignKey: 'cod_tarea' });
