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
  updating: boolean;
  error: string | null;
  currentBranch: string;
  refreshTasks: () => Promise<void>;
  selectBranch: (branch: string) => void;
  submitPracticeResult: (payload: ResultPayload) => Promise<void>;
};

export type { Result, Task, TasksContextValue, ResultPayload };
