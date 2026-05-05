import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface Task {
  title: string;
  explanation: string;
  code: string;
  dueDate: string | null;
  level: number;
}

type TasksByBranch = Record<string, Task[]>;

const dbPath = join(import.meta.dirname, "..", "data", "learning.json");

export async function readJson(): Promise<TasksByBranch> {
  try {
    const raw = await readFile(dbPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

export async function writeJson(payload: TasksByBranch): Promise<void> {
  const data = JSON.stringify(payload, null, 2);
  await writeFile(dbPath, data);
}
