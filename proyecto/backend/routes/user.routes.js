import { Router } from "express"
import { getUsersAdmin, getUsersTeacher, getUsersStudent, getUser, deleteUser, updateUser, updateUserPassword, getEstudiantesNoMatriculados, getEstudiantesMatriculados } from "../controllers/user.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { editSchema, passwordSchema} from "../schemas/auth.schema.js";

const router = Router();

router.get("/estudiantes-no-matriculados", authRequired, getEstudiantesNoMatriculados)

router.get("/estudiantes-matriculados", authRequired, getEstudiantesMatriculados)

router.get("/admins", authRequired, getUsersAdmin);

router.get("/teachers", authRequired, getUsersTeacher);

router.get("/students", authRequired, getUsersStudent);

router.get("/user/:cod_usuario", authRequired, getUser)

router.put("/user/:cod_usuario", authRequired, validateSchema(editSchema), updateUser);

router.delete("/user/:cod_usuario", authRequired, deleteUser);

router.put("/password/:cod_usuario", authRequired, validateSchema(passwordSchema), updateUserPassword);

export default router;