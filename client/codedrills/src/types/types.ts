type Result = { title: string; done: boolean };

type ResultPayload = {
  branch: string;
  results: Result[];
};

type Task = {
  title: string;
  explanation: string;
  code: string;
  levels: string[];
  dueDate: number;
  level: number;
};

type TasksContextValue = {
  tasks: Record<string, Task[]>;
  loading: boolean;
  setLoading: (value: boolean) => void;
  updating: boolean;
  setUpdating: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  getTasks: () => Promise<void>;
  currentBranch: string;
  setCurrentBranch: (branch: string) => void;
};

export type { Result, Task, TasksContextValue, ResultPayload };
