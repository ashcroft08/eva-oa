import { Router } from "express"
import { getCursos, getCurso, createCurso, updateCurso, deletedCurso } from "../controllers/curso.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { cursoSchema } from "../schemas/curso.schema.js";

const router = Router();

router.post("/curso", authRequired, validateSchema(cursoSchema), createCurso);

router.get("/cursos", authRequired, getCursos);

router.get("/curso/:cod_curso", authRequired, getCurso);

router.put("/curso/:cod_curso", authRequired, validateSchema(cursoSchema), updateCurso);

router.delete("/curso/:cod_curso", authRequired, deletedCurso);

export default router;