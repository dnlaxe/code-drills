import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dbPath = join(import.meta.dirname, "..", "data", "learning.json");

export async function loadJsonFile<T>(fallback: T): Promise<T> {
  try {
    const raw = await readFile(dbPath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return fallback;
    }
    throw error;
  }
}

export async function saveJsonFile(payload: unknown): Promise<void> {
  const data = JSON.stringify(payload, null, 2);
  await writeFile(dbPath, data);
}
