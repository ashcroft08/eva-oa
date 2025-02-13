import { Router } from "express"
import { getCursos, getCurso, createCurso, updateCurso, deletedCurso, obtenerCursosPorDocente, obtenerEstudiantesPorDocente } from "../controllers/curso.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { cursoSchema } from "../schemas/curso.schema.js";

const router = Router();

router.post("/register-curso", authRequired, validateSchema(cursoSchema), createCurso);

router.get("/docente/cursos/:cod_docente", authRequired, obtenerCursosPorDocente)

router.get("/docente/estudiantes/:cod_docente", authRequired, obtenerEstudiantesPorDocente)

router.get("/cursos", authRequired, getCursos);

router.get("/curso/:cod_curso", authRequired, getCurso);

router.put("/curso/:cod_curso", authRequired, validateSchema(cursoSchema), updateCurso);

router.delete("/curso/:cod_curso", authRequired, deletedCurso);

export default router;