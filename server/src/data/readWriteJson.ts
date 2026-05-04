import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dbPath = join(import.meta.dirname, "..", "data", "db.json");

export async function readJson(): Promise<unknown[]> {
  try {
    const raw = await readFile(dbPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeJson(payload: unknown): Promise<void> {
  const data = JSON.stringify(payload, null, 2);
  await writeFile(dbPath, data);
}
