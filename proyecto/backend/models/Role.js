import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Role = sequelize.define('Role', {
    cod_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_rol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'roles',
    timestamps: false,
});

// Hook para insertar roles iniciales
Role.afterSync(async () => {
    const roles = ['Superusuario', 'Administrador', 'Docente', 'Estudiante'];
    for (const nombre of roles) {
        await Role.findOrCreate({ where: { nombre_rol: nombre } });
    }
});