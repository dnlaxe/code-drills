import type { Request, Response } from "express";
import { prepareDueTasks, updateJsonData } from "./tasks.service.js";
import type { UpdateTasksPayload } from "./tasks.types.js";
import { attempt } from "../../utils/attempt.js";

export async function updateData(req: Request, res: Response) {
  const payload = req.body as UpdateTasksPayload;

  const [result, error] = await attempt(updateJsonData(payload));

  if (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load due tasks";

    return res.status(500).json({ message });
  }

  return res.status(200).json({ message: "Result received", result });
}

export async function getDueTasks(_req: Request, res: Response) {
  const [dueTasks, error] = await attempt(prepareDueTasks());

  if (error) {
    return res.status(500).json({ message: "Failed to load due tasks" });
  }

  return res.json(dueTasks);
}
