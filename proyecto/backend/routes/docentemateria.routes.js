import { Router } from "express"
import { getDocentesMaterias, getDocenteMateria, createDocenteMateria, updateDocenteMateria, deleteDocenteMateria } from "../controllers/docenteMateria.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createDocenteMateriaSchema } from "../schemas/DocenteMateria.schema.js";
import { updateDocenteMateriaSchema } from "../schemas/DocenteMateria.schema.js";

const router = Router();

router.post("/asignar-docente", authRequired, createDocenteMateria);

router.get("/asignar-docente", authRequired, getDocentesMaterias);

router.get("/asignar-docente/:cod_asignacion", authRequired, getDocenteMateria);

router.put("/asignar-docente/:cod_asignacion", authRequired, validateSchema(updateDocenteMateriaSchema), updateDocenteMateria);

router.delete("/asignar-docente/:cod_asignacion", authRequired, deleteDocenteMateria);

export default router;