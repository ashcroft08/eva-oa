import app from './app.js';
import { sequelize } from './database/database.js';

// Importa todos los modelos
/*import './models/Usuario.js';
import './models/RecoverPassword.js';
import './models/Role.js';
import './models/Curso.js';
import './models/Materia.js';
import './models/Matricula.js';
import './models/ObjetoAprendizaje.js';
import './models/Tarea.js';
import './models/Wiki.js';
import './models/Foro.js';
import './models/MensajesForo.js';
import './models/Evaluacion.js';
import './models/Pregunta.js';
import './models/Opcion.js';
import './models/EntregaTarea.js';
import './models/MensajesWikis.js';
import './models/Progreso.js';
import './models/RealizacionObjetoAprendizaje.js';
import './models/Resultado.js';
import './models/Institucion.js';*/

// Importar los modelos para establecer relaciones
import { Usuario } from './models/Usuario.js';
import { Role } from './models/Role.js';

// Relación uno-a-muchos entre Usuario y Role

// En Usuario.js
Usuario.belongsTo(Role, { foreignKey: 'cod_rol' });

// En Role.js
Role.hasMany(Usuario, { foreignKey: 'cod_rol' });

async function main() {
    try {
        await sequelize.sync({ force: false });
        console.log("Base de datos sincronizada correctamente..");
        app.listen(4000);
        console.log("Server is listening on port", 4000);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();