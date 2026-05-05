import { Request, Response } from "express";
import updateJsonData from "./tasks.service";

export default async function updateData(req: Request, res: Response) {
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
