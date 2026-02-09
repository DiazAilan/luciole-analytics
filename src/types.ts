export interface TaskRow {
  task: string;
  category: string;
  sprint: number;
  compte?: string;
}

export interface SprintStats {
  sprint: number;
  count: number;
  categories: Record<string, number>;
}

export interface CategoryStats {
  category: string;
  count: number;
  sprints: number[];
}

export interface AnalyticsData {
  tasks: TaskRow[];
  totalTasks: number;
  sprintStats: SprintStats[];
  categoryStats: CategoryStats[];
  uniqueTasks: number;
  sprintRange: { min: number; max: number };
}
