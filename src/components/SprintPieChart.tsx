import { useState, useEffect } from 'react';
import type { AnalyticsData } from '../types';
import styles from './SprintPieChart.module.scss';

const CATEGORY_COLORS: string[] = ['#4a90d9', '#e06c6c', '#e6c04a', '#8b949e'];

function getCategoryColor(index: number): string {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

export function SprintPieChart({ data }: { data: AnalyticsData }) {
  const lastSprint =
    data.sprintStats.length > 0
      ? data.sprintStats[data.sprintStats.length - 1].sprint
      : null;

  const [selectedSprint, setSelectedSprint] = useState<number | null>(lastSprint);

  useEffect(() => {
    if (lastSprint === null) return;
    const exists = data.sprintStats.some((s) => s.sprint === selectedSprint);
    if (!exists) setSelectedSprint(lastSprint);
  }, [data.sprintStats, lastSprint, selectedSprint]);

  const sprintStat = data.sprintStats.find((s) => s.sprint === selectedSprint);
  if (!sprintStat || !selectedSprint) return null;

  const total = sprintStat.count;
  if (total === 0) return null;

  const categoryEntries = Object.entries(sprintStat.categories).sort(
    ([, a], [, b]) => b - a
  );

  const segments = categoryEntries.map(([name, count], i) => ({
    name,
    count,
    percent: (count / total) * 100,
    color: getCategoryColor(i),
  }));

  const conicParts = segments
    .map((s, i) => {
      const prev = segments.slice(0, i).reduce((a, b) => a + b.percent, 0);
      return `${s.color} ${prev}% ${prev + s.percent}%`;
    })
    .join(', ');

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Répartition par sprint</h2>
        <select
          className={styles.select}
          value={selectedSprint}
          onChange={(e) => setSelectedSprint(Number(e.target.value))}
          aria-label="Sprint"
        >
          {data.sprintStats.map((s) => (
            <option key={s.sprint} value={s.sprint}>
              Sprint {s.sprint}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.content}>
        <div
          className={styles.pie}
          style={{ background: `conic-gradient(${conicParts})` }}
        />
        <div className={styles.legend}>
          {segments.map((s) => (
            <div key={s.name} className={styles.legendItem}>
              <span
                className={styles.swatch}
                style={{ background: s.color }}
              />
              <span className={styles.label}>{s.name}</span>
              <span className={styles.percent}>{s.percent.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
