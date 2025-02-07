/*import Sequelize from 'sequelize'

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize('eva', 'my_eva', '@dmin_eva*', {
    host: 'localhost',
    dialect: 'mysql'
});*/

import Sequelize from 'sequelize';

// Configuración para PostgreSQL
export const sequelize = new Sequelize('eva', 'my_eva', '@dmin_eva*', {
    host: 'localhost',
    dialect: 'postgres', // Cambia el dialecto a 'postgres'
    port: 5432, // Puerto predeterminado de PostgreSQL
    logging: false, // Opcional: desactiva los logs de SQL
});

export default sequelize;