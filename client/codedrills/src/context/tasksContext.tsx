import { createContext, useContext } from "react";
import type { TasksContextValue } from "../types/types";

export const TasksContext = createContext<TasksContextValue | null>(null);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
