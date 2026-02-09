import type { AnalyticsData } from '../types';
import styles from './SummaryCards.module.scss';

interface SummaryCardsProps {
  data: AnalyticsData;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const avgPerSprint =
    data.sprintStats.length > 0
      ? Math.round(
          data.totalTasks / data.sprintStats.length
        )
      : 0;

  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <span className={styles.value}>{data.totalTasks}</span>
        <span className={styles.label}>Tâches totales</span>
      </div>
      <div className={styles.card}>
        <span className={styles.value}>{data.sprintStats.length}</span>
        <span className={styles.label}>Sprints</span>
      </div>
      <div className={styles.card}>
        <span className={styles.value}>{data.categoryStats.length}</span>
        <span className={styles.label}>Catégories</span>
      </div>
      <div className={styles.card}>
        <span className={styles.value}>{avgPerSprint}</span>
        <span className={styles.label}>Moy. par sprint</span>
      </div>
      <div className={styles.card}>
        <span className={styles.value}>
          {data.sprintRange.min} – {data.sprintRange.max}
        </span>
        <span className={styles.label}>Période sprints</span>
      </div>
    </div>
  );
}
