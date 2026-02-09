import type { AnalyticsData } from '../types';
import { SummaryCards } from './SummaryCards';
import { ChargeDistributionPie } from './ChargeDistributionPie';
import { SprintPieChart } from './SprintPieChart';
import { ChargeEvolutionChart } from './ChargeEvolutionChart';
import { ChargeDistributionTable } from './ChargeDistributionTable';
import styles from './AnalyticsReports.module.scss';

interface AnalyticsReportsProps {
  data: AnalyticsData;
}

export function AnalyticsReports({ data }: AnalyticsReportsProps) {
  return (
    <div className={styles.reports}>
      <SummaryCards data={data} />
      <div className={styles.pieRow}>
        <ChargeDistributionPie data={data} />
        <SprintPieChart data={data} />
      </div>
      <ChargeEvolutionChart data={data} />
      <ChargeDistributionTable data={data} />
    </div>
  );
}
