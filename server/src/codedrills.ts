import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import learningData from "./data/learning.json";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/tasks", (_req: Request, res: Response) => {
  res.json(learningData);
});

app.post("/api/tasks", (req: Request, res: Response) => {
  const data = req.body;
  console.log(`BACKEND: ${data}`);
  res.status(200).json({ message: "Result received" });
});

export default app;
