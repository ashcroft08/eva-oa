import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Matricula } from './Matricula.js';
import { Materia } from './Materia.js';

export const Curso = sequelize.define('Curso', {
    cod_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_curso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paralelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'cursos',
    timestamps: true,
});

// Relaciones
Curso.hasMany(Matricula, { foreignKey: 'cod_curso' });
Matricula.belongsTo(Curso, { foreignKey: 'cod_curso' });

Curso.hasMany(Materia, { foreignKey: 'cod_curso' });
Materia.belongsTo(Curso, { foreignKey: 'cod_curso' });