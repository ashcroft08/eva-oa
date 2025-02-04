import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Matricula } from './Matricula.js';

// Tabla Periodo
export const Periodo = sequelize.define('Periodo', {
    cod_periodo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    anio_lectivo: {
        type: DataTypes.STRING, // Cambiado a STRING para permitir formatos como '2023-2024'
        allowNull: false,
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'periodo',
    timestamps: true,
});

Periodo.hasMany(Matricula, { foreignKey: 'cod_periodo' }); // Usamos anio_lectivo como FK
Matricula.belongsTo(Periodo, { foreignKey: 'cod_periodo' });