import { readJson, writeJson } from "../../data/readWriteJson";

function calculateDueDate(level: number): string {
  const now = new Date();
  now.setDate(now.getDate() + level);
  return now.toISOString();
}

export default async function updateJsonData(
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
