import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { ObjetoAprendizaje } from './ObjetoAprendizaje.js';
import { Tarea } from './Tarea.js';
import { Foro } from './Foro.js';
import { MensajesForo } from './MensajesForo.js';
import { Evaluacion } from './Evaluacion.js';
import { Wiki } from './Wiki.js';
import { Progreso } from './Progreso.js';
import { Resultado } from './Resultado.js';
import { RealizacionObjetoAprendizaje } from './RealizacionObjetoAprendizaje.js';

export const Materia = sequelize.define('Materia', {
    cod_materia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cursos',
            key: 'cod_curso',
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
    nombre_materia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'materias',
    timestamps: true,
});

//Relaciones
Materia.hasMany(ObjetoAprendizaje, { foreignKey: 'cod_materia' });
ObjetoAprendizaje.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Tarea, { foreignKey: 'cod_materia' });
Tarea.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Foro, { foreignKey: 'cod_materia' });
Foro.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(MensajesForo, { foreignKey: 'cod_materia' });
MensajesForo.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Evaluacion, { foreignKey: 'cod_materia' });
Evaluacion.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Wiki, { foreignKey: 'cod_materia' });
Wiki.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Progreso, { foreignKey: 'cod_materia' });
Progreso.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(Resultado, { foreignKey: 'cod_materia' });
Resultado.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(RealizacionObjetoAprendizaje, { foreignKey: 'cod_materia' });
RealizacionObjetoAprendizaje.belongsTo(Materia, { foreignKey: 'cod_materia' });

Materia.hasMany(RealizacionObjetoAprendizaje, { foreignKey: 'cod_materia' });
RealizacionObjetoAprendizaje.belongsTo(Materia, { foreignKey: 'cod_materia' });