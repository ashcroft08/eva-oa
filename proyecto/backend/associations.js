import { Usuario } from './models/Usuario.js';
import { Rol } from './models/Rol.js';
// Importa todos los modelos necesarios...

export const setupAssociations = () => {
    // Relación Usuario-Rol
    Usuario.belongsTo(Rol, { foreignKey: 'cod_rol' });
    Rol.hasMany(Usuario, { foreignKey: 'cod_rol' });
    
    // Define aquí todas las demás relaciones
};