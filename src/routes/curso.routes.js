import { Router } from "express";
import { findAll, findById, create, update, remove } from "../controllers/curso.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { cursoSchema } from "../schemas/curso.schema.js";
import { verifyToken, verifyRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', verifyToken, verifyRole('admin', 'profesor'), validate(cursoSchema), create);
router.put('/:id', verifyToken, verifyRole('admin', 'profesor'), validate(cursoSchema), update);
router.delete('/:id', verifyToken, verifyRole('admin'), remove);

export default router;