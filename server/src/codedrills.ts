import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import tasksRoutes from "./features/tasks/tasks.routes";

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

app.use("/api/tasks", tasksRoutes);

export default app;
