import Papa from 'papaparse';
import type { TaskRow } from '../types';

export function parseCSV(content: string): TaskRow[] {
  const result = Papa.parse<string[]>(content, {
    skipEmptyLines: true,
  });

  const tasks: TaskRow[] = [];
  const rows = result.data;

  if (!rows || rows.length < 2) return tasks;

  const header = rows[0].map((h: string) => h?.trim().toLowerCase() || '');
  const taskIdx = header.findIndex((h: string) => h.includes('tâche') || h === 'task');
  const catIdx = header.findIndex((h: string) => h.includes('categorie') || h.includes('catégorie'));
  const sprintIdx = header.findIndex((h: string) => h.includes('sprint'));
  const compteIdx = header.findIndex((h: string) => h.includes('compte'));

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const task = (taskIdx >= 0 ? row[taskIdx] : row[0])?.trim() || '';
    const category = (catIdx >= 0 ? row[catIdx] : row[1])?.trim() || '';
    const sprintVal = (sprintIdx >= 0 ? row[sprintIdx] : row[2])?.trim() || '';
    const compte = compteIdx >= 0 ? row[compteIdx]?.trim() : undefined;

    const sprint = parseInt(sprintVal, 10);
    if (!task || isNaN(sprint) || sprint < 1) continue;

    tasks.push({
      task,
      category: category || 'Non catégorisé',
      sprint,
      compte: compte || undefined,
    });
  }

  return tasks;
}
