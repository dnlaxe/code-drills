import { useEffect, useState } from "react";
import type { Result, ResultPayload } from "../../types/types";
import { sendResult } from "../../api/data";
import { useTasks } from "../../context/tasksContext";

export default function Practice() {
  const { tasks, currentBranch, loading, error, setError, getTasks } =
    useTasks();

  const branchTasks = tasks[currentBranch] ?? [];

  const [level, setLevel] = useState(0);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);

  const currentTask = branchTasks[current];
  const currentPrompt = currentTask?.levels[level] ?? "";

  useEffect(() => {
    setLevel(0);
    setCurrent(0);
    setAnswer("");
    setDone(false);
    setError(null);
  }, [currentBranch, setError]);

  async function onComplete(payload: ResultPayload) {
    await sendResult(payload);
    await getTasks();
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const isCorrect = currentTask.code.trim() === answer.trim();

    if (!isCorrect) {
      setError("Try again!");
      return;
    }

    setAnswer("");
    setError(null);

    const isLastLevel = level === 2;
    if (!isLastLevel) {
      setLevel((prev) => prev + 1);
      return;
    }

    const completedResult = { title: currentTask.title, done: true };
    const isLastTask = current === branchTasks.length - 1;

    await onComplete({
      branch: currentBranch,
      results: [completedResult],
    });

    if (isLastTask) {
      setDone(true);
      return;
    }

    setLevel(0);
    setCurrent((prev) => prev + 1);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[120px]">Loading...</div>
      </div>
    );
  }

  if (branchTasks.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-3xl">No tasks for this branch.</div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[120px]">Done!</div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl self-start px-3 py-2 bg-[#E8EDF6] border font-[400]">
              {currentTask.title}
            </h1>
            <p className="px-2 font-[400] text-lg whitespace-pre-wrap leading-[1.6]">
              {currentTask.explanation}
            </p>
          </div>

          <div className="flex flex-col">
            <pre className="bg-[#E8EDF6] p-4 text-lg overflow-x-auto border border-b-0">
              <code>{currentPrompt}</code>
            </pre>
            <textarea
              className={`h-100 w-full border ${error ? "border-2 border-red-500" : ""} p-4 text-lg font-[monospace]`}
              value={answer}
              onChange={(event) => {
                setError("");
                setAnswer(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
            ></textarea>
          </div>

          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className={`text-xl border px-5 py-2 ${error ? "opacity-50" : ""} bg-[#B8E7FF]`}
              disabled={error !== "" || loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
