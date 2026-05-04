import { useEffect, useState } from "react";
import { sendResult, getAllTasks } from "../../api/data";

export default function Practice() {
  type Result = { title: string; done: boolean };

  type Task = {
    title: string;
    explanation: string;
    code: string;
    type: string;
    dueDate: string | null;
    level: number;
  };

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result[]>([]);
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTasks() {
      const data = await getAllTasks();
      setData(data);
      console.log(`FRONTEND: ${data}`);
      setLoading(false);
    }
    getTasks();
  }, []);

  function onComplete(payload: Result[]) {
    sendResult(payload);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const isCorrect = data[current].code.trim() === answer.trim();

    if (isCorrect) {
      setResult((prev) => [
        ...prev,
        { title: data[current].title, done: true },
      ]);
      setCurrent(current + 1);
      setAnswer("");

      if (current >= data.length - 1) {
        setDone(true);
        console.log(result);
        onComplete([...result, { title: data[current].title, done: true }]);
      }
    } else {
      setError("Try again!");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[120px]">Loading...</div>
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
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">{data[current].title}</h1>
            <p className="text-2xl">{data[current].explanation}</p>
          </div>

          <div className="flex flex-col">
            <code className="border p-4 text-xl border-b-0">
              {data[current].code}
            </code>
            <textarea
              className={`h-100 w-full border ${error ? "border-2 border-red-500" : ""} p-4 text-xl font-[monospace]`}
              value={answer}
              onChange={(event) => {
                setError("");
                setAnswer(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
            ></textarea>
          </div>

          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className={`text-xl border px-5 py-2 ${error ? "opacity-50" : ""}`}
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
