import { Router } from "express";
import { updateData, getDueTasks } from "./tasks.controller";

const router = Router();

router.get("/", getDueTasks);

router.post("/", updateData);

export default router;
