import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'; // Ajusta la ruta según tu estructura

export const Institucion = sequelize.define('Institucion', {
    cod_institucion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    logo_institucion: {
        type: DataTypes.STRING, // Almacena URL o ruta del archivo
        allowNull: true, // Opcional
    },
    nombre_institucion: {
        type: DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
}, {
    tableName: 'institucion', // Asegúrate de que coincida con el nombre en tu BD
    timestamps: true, // Desactiva createdAt y updatedAt
});

// Si necesitas relaciones, agrégalas aquí