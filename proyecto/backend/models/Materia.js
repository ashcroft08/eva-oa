import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { ObjetoAprendizaje } from './ObjetoAprendizaje.js';
import { Tarea } from './Tarea.js';
import { Foro } from './Foro.js';
import { MensajeForo } from './MensajeForo.js';
import { Evaluacion } from './Evaluacion.js';
import { Wiki } from './Wiki.js';
import { Progreso } from './Progreso.js';
import { Resultado } from './Resultado.js';
import { RealizacionObjetoAprendizaje } from './RealizacionObjetoAprendizaje.js';
import { DocenteMateria } from "./DocenteMateria.js"

export const Materia = sequelize.define('Materia', {
    cod_materia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_materia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cod_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'curso',
            key: 'cod_curso',
        },
    },
}, {
    tableName: 'materia',
    timestamps: true,
});

//Relaciones
Materia.hasMany(DocenteMateria, { foreignKey: 'cod_materia' });
DocenteMateria.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(ObjetoAprendizaje, { foreignKey: 'cod_materia' });
ObjetoAprendizaje.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Tarea, { foreignKey: 'cod_materia' });
Tarea.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Foro, { foreignKey: 'cod_materia' });
Foro.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Evaluacion, { foreignKey: 'cod_materia' });
Evaluacion.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Wiki, { foreignKey: 'cod_materia' });
Wiki.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Progreso, { foreignKey: 'cod_materia' });
Progreso.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(RealizacionObjetoAprendizaje, { foreignKey: 'cod_materia' });
RealizacionObjetoAprendizaje.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(RealizacionObjetoAprendizaje, { foreignKey: 'cod_materia' });
RealizacionObjetoAprendizaje.belongsTo(Materia, { foreignKey: 'cod_materia' });