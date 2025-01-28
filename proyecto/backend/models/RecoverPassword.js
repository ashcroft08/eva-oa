// models/RecoverPassword.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './Usuario.js';  // Asegúrate de importar el modelo de Usuario

export const RecoverPassword = sequelize.define('RecoverPassword', {
    cod_recover: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,  // Conexión con el modelo Usuario
            key: 'cod_usuario',  // Clave primaria de Usuario
        },
    },
}, {
    timestamps: true,
    tableName: 'recover_passwords',  // Nombre de la tabla de recuperación de contraseñas
});

// Relación con el modelo Usuario (un usuario puede tener muchos registros de recuperación de contraseña)
Usuario.hasMany(RecoverPassword, { foreignKey: 'cod_usuario' });
RecoverPassword.belongsTo(Usuario, { foreignKey: 'cod_usuario' });