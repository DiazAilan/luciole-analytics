import type { AnalyticsData } from '../types';
import styles from './CategoryReport.module.scss';

interface CategoryReportProps {
  data: AnalyticsData;
}

export function CategoryReport({ data }: CategoryReportProps) {
  const maxCount = Math.max(...data.categoryStats.map((c) => c.count), 1);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Répartition par catégorie</h2>
      <div className={styles.chart}>
        {data.categoryStats.map((stat) => (
          <div key={stat.category} className={styles.row}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  width: `${(stat.count / maxCount) * 100}%`,
                }}
              />
            </div>
            <div className={styles.labelRow}>
              <span className={styles.categoryLabel} title={stat.category}>
                {stat.category.length > 28
                  ? stat.category.slice(0, 26) + '…'
                  : stat.category}
              </span>
              <span className={styles.count}>{stat.count}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p>
          Sprints {data.sprintRange.min} – {data.sprintRange.max}
        </p>
      </div>
    </section>
  );
}
