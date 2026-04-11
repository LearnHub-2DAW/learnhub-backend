import { Router } from "express";
import { findAll, findById, create, update, remove } from "../controllers/curso.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { cursoSchema } from "../schemas/curso.schema.js"

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', validate(cursoSchema), create);
router.put('/:id', validate(cursoSchema), update);
router.delete('/:id', remove);

export default router;