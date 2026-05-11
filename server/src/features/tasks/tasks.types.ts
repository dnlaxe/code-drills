export interface StoredTask {
  title: string;
  explanation: string;
  code: string;
  dueDate: number;
  level: number;
}

export interface PracticeTask extends StoredTask {
  levels: string[];
}

export type TasksByBranch = Record<string, StoredTask[]>;
export type PracticeTasksByBranch = Record<string, PracticeTask[]>;

export interface TaskResult {
  title: string;
  done: boolean;
}

export interface UpdateTasksPayload {
  branch: string;
  results: TaskResult[];
}
