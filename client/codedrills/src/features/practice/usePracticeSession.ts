import { useState } from "react";
import { useTasks } from "../../context/tasksContext";

export function usePracticeSession() {
  const {
    tasks,
    currentBranch,
    loading,
    updating,
    error,
    submitPracticeResult,
  } = useTasks();

  const branchTasks = tasks[currentBranch] ?? [];
  const currentTask = branchTasks[0];

  const [level, setLevel] = useState(0);
  const [answer, setAnswer] = useState("");
  const [sessionError, setSessionError] = useState<string | null>(null);

  const totalLevels = currentTask?.levels?.length ?? 0;
  const currentPrompt = currentTask?.levels[level] ?? "";
  const isLastLevel = level >= totalLevels - 1;

  async function completeCurrentTask() {
    if (!currentTask) {
      return;
    }

    await submitPracticeResult({
      branch: currentBranch,
      results: [{ title: currentTask.title, done: true }],
    });

    setLevel(0);
    setAnswer("");
    setSessionError(null);
  }

  async function submitAnswer() {
    if (!currentTask) {
      return;
    }

    const isCorrect = currentTask.code.trim() === answer.trim();

    if (!isCorrect) {
      setSessionError("Try again!");
      return;
    }

    setSessionError(null);
    setAnswer("");

    if (!isLastLevel) {
      setLevel((prev) => prev + 1);
      return;
    }

    await completeCurrentTask();
  }

  function updateAnswer(value: string) {
    setSessionError(null);
    setAnswer(value);
  }

  function resetSession() {
    setLevel(0);
    setAnswer("");
    setSessionError(null);
  }

  return {
    loading,
    updating,
    error: sessionError ?? error,
    branchTasks,
    currentTask,
    currentPrompt,
    level,
    answer,
    updateAnswer,
    submitAnswer,
    resetSession,
    totalLevels,
  };
}
