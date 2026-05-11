import * as taskRepository from "./tasks.repo.js";
import type {
  PracticeTasksByBranch,
  UpdateTasksPayload,
} from "./tasks.types.js";

export async function updateJsonData(payload: UpdateTasksPayload) {
  await taskRepository.completeTasks(
    payload.branch,
    payload.results,
    Date.now(),
  );

  return { ok: true };
}

export async function prepareDueTasks(): Promise<PracticeTasksByBranch> {
  return taskRepository.getDueTasks(Date.now());
}
