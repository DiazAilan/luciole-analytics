import type { AnalyticsData } from '../types';
import styles from './ChargeDistributionTable.module.scss';

const CATEGORY_COLORS = ['#4a90d9', '#e06c6c', '#e6c04a'];

type RowData = { sprint: number } & Record<string, number>;

export function ChargeDistributionTable({ data }: { data: AnalyticsData }) {
  const mainCategories = data.categoryStats
    .slice(0, 3)
    .map((c) => c.category);

  const sprintRows: RowData[] = data.sprintStats.map((s) => ({
    sprint: s.sprint,
    ...s.categories,
  }));

  const totals = mainCategories.reduce(
    (acc, cat) => {
      acc[cat] = data.categoryStats.find((c) => c.category === cat)?.count ?? 0;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalGeneral = Object.values(totals).reduce((a, b) => a + b, 0);
  const sprintCount = data.sprintStats.length;
  const avgPerCategory = mainCategories.reduce(
    (acc, cat) => {
      acc[cat] = sprintCount > 0 ? (totals[cat] / sprintCount).toFixed(1) : '0';
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Charge par sprint — Composant, Devops / Architecture et Site Storybook
      </h2>
      <div className={styles.legend}>
        {mainCategories.map((cat, i) => (
          <span key={cat} className={styles.legendItem}>
            <span className={styles.swatch} style={{ backgroundColor: CATEGORY_COLORS[i] }} />
            {cat}
          </span>
        ))}
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sprint</th>
              <th>Distribution</th>
            </tr>
          </thead>
          <tbody>
            {sprintRows.map((row) => {
              const rowTotal = mainCategories.reduce(
                (s, c) => s + ((row as Record<string, number>)[c] ?? 0),
                0
              );
              const segments = mainCategories.map((cat, i) => {
                const val = (row as Record<string, number>)[cat] ?? 0;
                const pct = rowTotal > 0 ? (val / rowTotal) * 100 : 0;
                return { cat, val, pct, color: CATEGORY_COLORS[i] };
              });
              return (
                <tr key={row.sprint}>
                  <td>Sprint {row.sprint}</td>
                  <td className={styles.distCell}>
                    <div className={styles.stackedBar}>
                      {segments.map((s) => (
                        <div
                          key={s.cat}
                          className={styles.segment}
                          style={{
                            width: `${s.pct}%`,
                            backgroundColor: s.color,
                          }}
                          title={`${s.cat}: ${s.pct.toFixed(1)}%`}
                        />
                      ))}
                    </div>
                    <div className={styles.pctLabels}>
                      {segments.map((s) => (
                        <span key={s.cat} style={{ color: s.color }}>
                          {s.pct.toFixed(0)}%
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className={styles.totalRow}>
              <td>Total général</td>
              <td className={styles.distCell}>
                <div className={styles.stackedBar}>
                  {mainCategories.map((cat, i) => {
                    const pct = totalGeneral > 0 ? (totals[cat] / totalGeneral) * 100 : 0;
                    return (
                      <div
                        key={cat}
                        className={styles.segment}
                        style={{
                          width: `${pct}%`,
                          backgroundColor: CATEGORY_COLORS[i],
                        }}
                        title={`${cat}: ${pct.toFixed(1)}%`}
                      />
                    );
                  })}
                </div>
                <div className={styles.pctLabels}>
                  {mainCategories.map((cat, i) => {
                    const pct = totalGeneral > 0 ? (totals[cat] / totalGeneral) * 100 : 0;
                    return (
                      <span key={cat} style={{ color: CATEGORY_COLORS[i] }}>
                        {pct.toFixed(0)}%
                      </span>
                    );
                  })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.avgSection}>
        <h3>Moyenne par sprint</h3>
        <div className={styles.avgGrid}>
          {mainCategories.map((cat) => (
            <div key={cat} className={styles.avgItem}>
              <span className={styles.avgLabel}>{cat}</span>
              <span className={styles.avgValue}>{avgPerCategory[cat]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
