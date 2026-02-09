import { useMemo } from 'react';
import type { TaskRow, SprintStats, CategoryStats, AnalyticsData } from '../types';

export function useAnalytics(tasks: TaskRow[]): AnalyticsData | null {
  return useMemo(() => {
    if (!tasks.length) return null;

    const sprintMap = new Map<number, { count: number; categories: Record<string, number> }>();
    const categoryMap = new Map<string, Set<number>>();
    const uniqueTaskIds = new Set<string>();

    let minSprint = Infinity;
    let maxSprint = -Infinity;

    for (const row of tasks) {
      const taskId = row.task.replace(/^[A-Z]+-\d+/, '').trim() || row.task;
      uniqueTaskIds.add(`${row.sprint}-${taskId}`);

      minSprint = Math.min(minSprint, row.sprint);
      maxSprint = Math.max(maxSprint, row.sprint);

      if (!sprintMap.has(row.sprint)) {
        sprintMap.set(row.sprint, { count: 0, categories: {} });
      }
      const sprintData = sprintMap.get(row.sprint)!;
      sprintData.count += 1;
      sprintData.categories[row.category] = (sprintData.categories[row.category] || 0) + 1;

      if (!categoryMap.has(row.category)) {
        categoryMap.set(row.category, new Set());
      }
      categoryMap.get(row.category)!.add(row.sprint);
    }

    const sprintStats: SprintStats[] = Array.from(sprintMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([sprint, data]) => ({
        sprint,
        count: data.count,
        categories: data.categories,
      }));

    const categoryStats: CategoryStats[] = Array.from(categoryMap.entries())
      .map(([category, sprints]) => ({
        category,
        count: tasks.filter((t) => t.category === category).length,
        sprints: Array.from(sprints).sort((a, b) => a - b),
      }))
      .sort((a, b) => b.count - a.count);

    return {
      tasks,
      totalTasks: tasks.length,
      sprintStats,
      categoryStats,
      uniqueTasks: uniqueTaskIds.size,
      sprintRange: { min: minSprint, max: maxSprint },
    };
  }, [tasks]);
}
