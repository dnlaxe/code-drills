import { useEffect, useState } from "react";
import type { Result, ResultPayload } from "../../types/types";
import { sendResult } from "../../api/data";
import { useTasks } from "../../context/tasksContext";

export default function Practice() {
  const { tasks, currentBranch, loading, error, setError } = useTasks();

  const branchTasks = tasks[currentBranch] ?? [];

  const [level, setLevel] = useState(0);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<Result[]>([]);

  const currentTask = branchTasks[current];
  const currentPrompt = currentTask?.levels[level] ?? "";

  useEffect(() => {
    setLevel(0);
    setCurrent(0);
    setAnswer("");
    setDone(false);
    setResult([]);
    setError(null);
  }, [currentBranch, setError]);

  function onComplete(payload: ResultPayload) {
    sendResult(payload);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
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
    const finalResults = [...result, completedResult];
    const isLastTask = current === branchTasks.length - 1;

    setResult(finalResults);

    if (isLastTask) {
      setDone(true);
      onComplete({
        branch: currentBranch,
        results: finalResults,
      });
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
            <h1 className="text-xl border border-slate-200 self-start px-3 py-2 bg-slate-50">
              {currentTask.title}
            </h1>
            <p className="text-xl px-2 font-[400] tracking-[0.25px]">
              {currentTask.explanation}
            </p>
          </div>

          <div className="flex flex-col">
            <pre className="border border-slate-200 bg-slate-50 p-4 text-lg border-b-0 overflow-x-auto">
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
              className={`text-xl border border-slate-200 px-5 py-2 ${error ? "opacity-50" : ""}`}
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
