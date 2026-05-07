import { readJson, writeJson } from "../../data/readWriteJson";

interface StoredTask {
  title: string;
  explanation: string;
  code: string;
  dueDate: number;
  level: number;
}

type TasksByBranch = Record<string, StoredTask[]>;

function calculateDueDate(level: number): number {
  const millisecondsPerHour = 60 * 60 * 1000;
  return Date.now() + 2 * level * millisecondsPerHour;
}

export async function updateJsonData(
  branch: string,
  results: { title: string; done: boolean }[],
) {
  const allTasks = await readJson();
  const branchTasks = allTasks[branch];

  if (!branchTasks) {
    throw new Error("Invalid branch");
  }

  for (const result of results) {
    if (!result.done) continue;

    const task = branchTasks.find((b) => b.title === result.title);
    if (!task) continue;

    task.level++;
    task.dueDate = calculateDueDate(task.level);

    await writeJson(allTasks);

    console.log(
      `title: ${result.title}, new due date: ${task.dueDate}, new level: ${task.level}`,
    );
  }

  return { ok: true };
}

export async function prepareDueTasks() {
  const allTasks = await readJson();

  const now = Date.now();

  const dueTasks = Object.fromEntries(
    Object.entries(allTasks).map(([branch, cards]) => [
      branch,
      cards
        .filter((card) => card.dueDate <= now)
        .sort((a, b) => b.level - a.level),
    ]),
  );

  const dueTasksWithLevels = await createLevels(dueTasks);

  return dueTasksWithLevels;
}

function createLevels(tasks: TasksByBranch) {
  return Object.fromEntries(
    Object.entries(tasks).map(([branch, cards]) => [
      branch,
      cards.map((card) => ({
        ...card,
        levels: [card.code, card.code, card.code],
      })),
    ]),
  );
}
