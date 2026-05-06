import { Request, Response } from "express";
import { updateJsonData, prepareDueTasks } from "./tasks.service";

export async function updateData(req: Request, res: Response) {
  const data = req.body;
  const branch = data.branch;
  const results = data.results;
  console.log("BACKEND:", JSON.stringify(data, null, 2));

  const result = await updateJsonData(branch, results);

  if (!result.ok) {
    res.status(200).json({ message: "Result not received" });
  }

  res.status(200).json({ message: "Result received" });
}

export async function getDueTasks(req: Request, res: Response) {
  const dueTasks = await prepareDueTasks();

  if (Object.keys(dueTasks).length === 0) {
    return res.json({});
  }

  return res.json(dueTasks);
}
