import { Router } from "express"
import { getMatriculas, getMatricula, createMatricula, updateMatricula, deleteMatricula } from "../controllers/matricula.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { matriculaSchema } from "../schemas/matricula.schema.js";

const router = Router();

router.post("/register-matricula", authRequired, validateSchema(matriculaSchema), createMatricula);

router.get("/matriculas", authRequired, getMatriculas);

router.get("/matricula/:cod_matricula", authRequired, getMatricula);

router.put("/matricula/:cod_matricula", authRequired, validateSchema(matriculaSchema), updateMatricula);

router.delete("/matricula/:cod_matricula", authRequired, deleteMatricula);

export default router;