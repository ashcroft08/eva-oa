// routes/materias.js
import { Router } from 'express';
import {
    getMaterias,
    createMateria,
    updateMateria,
    deleteMateria,
    getMateria,
    getCursos,
    getMateriasCurso
} from '../controllers/materia.controller.js';
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { materiaSchema } from "../schemas/materia.schema.js";

const router = Router();

router.get("/materias/:cod_curso", authRequired, getMateriasCurso)
router.get("/cursos/materias", authRequired, getCursos)
router.get('/materias', authRequired, getMaterias);
router.post('/register-materia', authRequired, validateSchema(materiaSchema), createMateria);
router.get('/materia/:cod_materia', authRequired, getMateria);
router.put('/materia/:cod_materia', authRequired, validateSchema(materiaSchema), updateMateria);
router.delete('/materia/:cod_materia', authRequired, deleteMateria);

export default router;