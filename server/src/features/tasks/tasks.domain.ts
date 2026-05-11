import type { PracticeTask, StoredTask, TaskResult } from "./tasks.types.js";

const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const DIFFICULTY = [0, 0.5];
const LIMIT = 350; // 30 days-ish

export function calculateDueDate(level: number, now: number): number {
  return now + 2 * level * MILLISECONDS_PER_HOUR;
}

export function applyCompletion(task: StoredTask, now: number): StoredTask {
  const nextLevel = task.level < LIMIT ? task.level + 1 : LIMIT;
  return {
    ...task,
    level: nextLevel,
    dueDate: calculateDueDate(nextLevel, now),
  };
}

export function toPracticeTask(task: StoredTask): PracticeTask {
  return {
    ...task,
    levels: addBlanks(task.code),
  };
}

export function isCompletedResult(result: TaskResult): boolean {
  return result.done;
}

function addBlanks(text: string) {
  const levels = [];

  for (const difficulty of DIFFICULTY) {
    const wordPositions = [];
    const tokens = text.split(/(\b[A-Za-z_][A-Za-z0-9_]*\b)/);

    for (let i = 0; i < tokens.length; i++) {
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(tokens[i])) {
        wordPositions.push(i);
      }
    }

    const toBeBlanked = Math.floor(wordPositions.length * difficulty);

    const shuffled = [...wordPositions].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, toBeBlanked);

    for (const index of chosen) {
      tokens[index] = "_".repeat(tokens[index].length);
    }

    levels.push(tokens.join(""));
  }

  return levels;
}
