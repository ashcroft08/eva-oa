import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const RealizacionObjetoAprendizaje = sequelize.define('RealizacionObjetoAprendizaje', {
    cod_realizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_oa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'objetos_aprendizaje',
            key: 'cod_oa',
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
    contenido_url: {
        type: DataTypes.STRING,
    },
    fecha_realizacion: {
        type: DataTypes.DATE,
    },
    certificado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    puntaje: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'realizacion_objetos_aprendizaje',
    timestamps: true,
});
