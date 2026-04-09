import { Router } from "express";
import { findAll } from "../controllers/curso.controller.js";

const router = Router();

router.get('/', findAll);

export default router;