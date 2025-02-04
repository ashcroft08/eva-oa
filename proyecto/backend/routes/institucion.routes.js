import express from 'express';
import { getInstitucion, createInstitucion, deletedInstitucion, updateInstitucion, uploadLogo } from '../controllers/institucion.controller.js';
import { authRequired } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { institucionSchema } from "../schemas/institucion.schemas.js";

const router = express.Router();

// Ruta para obtener la institución
router.get('/institucion', authRequired, getInstitucion); // Cambiado para no requerir :cod_institucion

// Ruta para crear una nueva institución
router.post('/institucion', uploadLogo, authRequired, validateSchema(institucionSchema), createInstitucion); // Sin cambios

// Ruta para eliminar la institución
router.delete('/institucion', authRequired, deletedInstitucion); // Cambiado para no requerir :cod_institucion

// Ruta para actualizar la institución
router.put('/institucion', authRequired,  uploadLogo, updateInstitucion); // Cambiado para no requerir :cod_institucion

export default router;