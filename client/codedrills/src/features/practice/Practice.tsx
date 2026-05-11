import { useRef } from "react";
import { usePracticeSession } from "./usePracticeSession";

export default function Practice() {
  const {
    loading,
    updating,
    error,
    branchTasks,
    currentTask,
    currentPrompt,
    level,
    answer,
    updateAnswer,
    submitAnswer,
    totalLevels,
  } = usePracticeSession();

  const editorRef = useRef<HTMLDivElement | null>(null);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitAnswer();
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
        <div className="text-3xl underline decoration-[#9AE9DF] decoration-2 underline-offset-4">
          No tasks for this branch.
        </div>
      </div>
    );
  }

  if (!currentTask) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 pb-24">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="px-2 text-3xl underline decoration-[#9AE9DF] decoration-2 underline-offset-4">
            {currentTask.title}
          </h1>
          <p className="px-2 py-4 text-lg whitespace-pre-wrap leading-[1.8]">
            {currentTask.explanation}
          </p>
        </div>

        <div ref={editorRef} className="flex flex-col scroll-mt-4">
          <pre className="bg-[#F5F5F5] p-4 overflow-x-auto border rounded-t border-white border-b-0 leading-[1.6] relative">
            <div className="absolute top-4 right-4">
              {totalLevels === 0 ? "No levels" : `${level + 1}/${totalLevels}`}
            </div>
            <code>{currentPrompt}</code>
          </pre>

          <textarea
            className={`bg-white h-100 w-full border-2 ${error ? "border-[#D85F6F] focus:border-[#D85F6F]" : "border-white focus:border-[#9AE9DF]"} p-4 rounded-b leading-[1.6]`}
            value={answer}
            onChange={(event) => {
              updateAnswer(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            onFocus={() => {
              editorRef.current?.scrollIntoView({
                block: "start",
              });
            }}
          />
        </div>

        <div className="flex flex-row justify-end">
          <button
            type="submit"
            className={`text-xl px-5 py-2 rounded ${error ? "opacity-50" : ""} bg-[#9AE9DF]`}
            disabled={error !== null || loading || updating}
          >
            {updating ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
