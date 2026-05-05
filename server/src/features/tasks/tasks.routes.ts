import { Request, Response, Router } from "express";
import learningData from "../../data/learning.json";
import updateData from "./tasks.controller";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(learningData);
});

router.post("/", updateData);

export default router;
