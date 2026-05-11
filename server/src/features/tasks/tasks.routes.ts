import { Router } from "express";
import { getDueTasks, updateData } from "./tasks.controller.js";

const router = Router();

router.get("/", getDueTasks);
router.post("/", updateData);

export default router;
