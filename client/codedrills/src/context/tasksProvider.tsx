import { useEffect, useState } from "react";
import type { ResultPayload, Task } from "../types/types";
import { getAllTasks, sendResult } from "../api/data";
import { TasksContext } from "./tasksContext";

type TaskProviderProps = { children: React.ReactNode };

export function TasksProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBranch, setCurrentBranch] = useState("typescript");

  async function refreshTasks() {
    try {
      setError(null);
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Fetching data error");
      }
    }
  }

  function selectBranch(branch: string) {
    setCurrentBranch(branch);
  }

  async function submitPracticeResult(payload: ResultPayload) {
    try {
      setUpdating(true);
      setError(null);
      await sendResult(payload);
      await refreshTasks();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Submitting result failed");
      }
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadInitialTasks() {
      try {
        setError(null);
        const data = await getAllTasks();

        if (cancelled) return;

        setTasks(data);
      } catch (err) {
        if (cancelled) return;

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Fetching data error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitialTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = {
    tasks,
    loading,
    updating,
    error,
    currentBranch,
    refreshTasks,
    selectBranch,
    submitPracticeResult,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
