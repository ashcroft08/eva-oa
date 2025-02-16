import app from './app.js';
import { sequelize } from './database/database.js';
import { setupAssociations } from './associations.js';

// Importa todos los modelos
/*import './models/ConfiguracionToken.js'
import './models/Usuario.js';
import './models/RecoverPassword.js';
import './models/Rol.js';
import './models/Curso.js';
import './models/Materia.js';
import './models/DocenteMateria.js'
import './models/Periodo.js'
import './models/Matricula.js';
import './models/ObjetoAprendizaje.js';
import './models/Tarea.js';
import './models/Wiki.js';
import './models/Foro.js';
import './models/MensajeForo.js';
import './models/Evaluacion.js';
import './models/Pregunta.js';
import './models/Opcion.js';
import './models/EntregaTarea.js';
import './models/MensajeWiki.js';
import './models/Progreso.js';
import './models/RealizacionObjetoAprendizaje.js';
import './models/Resultado.js';
import './models/Institucion.js';*/

async function main() {
    try {
        // Establece relaciones después de importar modelos
        setupAssociations();
        await sequelize.sync({ force: false });
        console.log("Base de datos sincronizada correctamente..");
        app.listen(4000);
        console.log("Server is listening on port", 4000);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();