import { useEffect, useState } from "react";
import type { Task } from "../types/types";
import { getAllTasks } from "../api/data";
import { TasksContext } from "./tasksContext";

type TaskProviderProps = { children: React.ReactNode };

export function TasksProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBranch, setCurrentBranch] = useState("typescript");

  const getTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Fetching data error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const value = {
    tasks,
    loading,
    updating,
    error,
    getTasks,
    currentBranch,
    setCurrentBranch,
    setLoading,
    setError,
    setUpdating,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
