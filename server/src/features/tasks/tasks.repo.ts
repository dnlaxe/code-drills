import { loadJsonFile, saveJsonFile } from "../../data/readWriteJson.js";
import {
  applyCompletion,
  isCompletedResult,
  toPracticeTask,
} from "./tasks.domain.js";
import type {
  PracticeTasksByBranch,
  TaskResult,
  TasksByBranch,
} from "./tasks.types.js";

export async function getAllTasks(): Promise<TasksByBranch> {
  return loadJsonFile<TasksByBranch>({});
}

export async function getDueTasks(now: number): Promise<PracticeTasksByBranch> {
  const allTasks = await getAllTasks();

  return Object.fromEntries(
    Object.entries(allTasks).map(([branch, tasks]) => [
      branch,
      tasks
        .filter((task) => task.dueDate <= now)
        .sort((a, b) => b.level - a.level)
        .map(toPracticeTask),
    ]),
  );
}

export async function completeTasks(
  branch: string,
  results: TaskResult[],
  now: number,
): Promise<void> {
  const allTasks = await getAllTasks();
  const branchTasks = allTasks[branch];

  if (!branchTasks) {
    throw new Error("Invalid branch");
  }

  for (const result of results) {
    if (!isCompletedResult(result)) {
      continue;
    }

    const index = branchTasks.findIndex((task) => task.title === result.title);

    if (index === -1) {
      continue;
    }

    branchTasks[index] = applyCompletion(branchTasks[index], now);
  }

  await saveJsonFile(allTasks);
}
