import type { AnalyticsData } from '../types';
import styles from './ChargeDistributionPie.module.scss';

const CATEGORY_COLOR_MAP: Record<string, string> = {
  Composant: '#4a90d9',
  'Devops / Architecture': '#e06c6c',
  'Site Storybook': '#e6c04a',
  Maintenance: '#2ecc71',
};

const FALLBACK_COLORS: string[] = ['#4a90d9', '#e06c6c', '#e6c04a', '#8b949e'];

function getCategoryColor(name: string, index: number): string {
  return CATEGORY_COLOR_MAP[name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

export function ChargeDistributionPie({ data }: { data: AnalyticsData }) {
  const total = data.totalTasks;
  if (total === 0) return null;

  const segments = data.categoryStats.slice(0, 6).map((stat, i) => ({
    name: stat.category,
    count: stat.count,
    percent: (stat.count / total) * 100,
    color: getCategoryColor(stat.category, i),
  }));

  const conicParts = segments
    .map((s, i) => {
      const prev = segments
        .slice(0, i)
        .reduce((a, b) => a + b.percent, 0);
      return `${s.color} ${prev}% ${prev + s.percent}%`;
    })
    .join(', ');

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Répartition de la charge</h2>
      <div className={styles.content}>
        <div
          className={styles.pie}
          style={{
            background: `conic-gradient(${conicParts})`,
          }}
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
