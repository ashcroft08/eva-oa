import { Router } from "express"
import { getPeriodos, getPeriodo, createPeriodo, updatePeriodo, deletePeriodo } from "../controllers/periodo.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { periodoSchema } from "../schemas/periodo.schema.js";

const router = Router();

router.post("/register-periodo", authRequired, validateSchema(periodoSchema), createPeriodo);

router.get("/periodos", authRequired, getPeriodos);

router.get("/periodo/:cod_periodo", authRequired, getPeriodo);

router.put("/periodo/:cod_periodo", authRequired, validateSchema(periodoSchema), updatePeriodo);

router.delete("/periodo/:cod_periodo", authRequired, deletePeriodo);

export default router;