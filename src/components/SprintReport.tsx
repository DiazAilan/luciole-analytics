import type { AnalyticsData } from '../types';
import styles from './SprintReport.module.scss';

interface SprintReportProps {
  data: AnalyticsData;
}

export function SprintReport({ data }: SprintReportProps) {
  const maxCount = Math.max(...data.sprintStats.map((s) => s.count), 1);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Charge par sprint</h2>
      <div className={styles.chart}>
        {data.sprintStats.map((stat) => (
          <div key={stat.sprint} className={styles.barGroup}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  width: `${(stat.count / maxCount) * 100}%`,
                }}
              />
            </div>
            <div className={styles.labelRow}>
              <span className={styles.sprintLabel}>Sprint {stat.sprint}</span>
              <span className={styles.count}>{stat.count}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        {data.sprintStats.map((stat) => (
          <div key={stat.sprint} className={styles.sprintDetail}>
            <strong>Sprint {stat.sprint}</strong>
            <ul>
              {Object.entries(stat.categories)
                .sort(([, a], [, b]) => b - a)
                .map(([cat, count]) => (
                  <li key={cat}>
                    {cat}: {count}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
