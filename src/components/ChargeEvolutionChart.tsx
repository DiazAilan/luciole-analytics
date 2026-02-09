import type { AnalyticsData } from '../types';
import styles from './ChargeEvolutionChart.module.scss';

const CATEGORY_COLORS = ['#4a90d9', '#e06c6c', '#e6c04a'];

export function ChargeEvolutionChart({ data }: { data: AnalyticsData }) {
  const mainCategories = data.categoryStats
    .slice(0, 3)
    .map((c) => c.category);

  const sprintStats = data.sprintStats;
  if (sprintStats.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 800;
  const height = 280;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(
    ...sprintStats.flatMap((s) =>
      mainCategories.map((c) => s.categories[c] ?? 0)
    ),
    1
  );
  const yMax = Math.ceil(maxVal / 25) * 25 || 25;

  const yScale = (val: number) =>
    chartHeight - (val / yMax) * chartHeight;

  const linePath = (getVal: (s: (typeof sprintStats)[0]) => number) => {
    const points = sprintStats.map((s, i) => {
      const x = (i / Math.max(sprintStats.length - 1, 1)) * chartWidth;
      const y = yScale(getVal(s));
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Composant, Devops / Architecture et Site Storybook
      </h2>
      <div className={styles.legend}>
        {mainCategories.map((cat, i) => (
          <span key={cat} className={styles.legendItem}>
            <span
              className={styles.swatch}
              style={{ backgroundColor: CATEGORY_COLORS[i] }}
            />
            {cat}
          </span>
        ))}
      </div>
      <div className={styles.chartWrap}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={styles.svg}
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Y-axis grid */}
            {[0, 25, 50, 75, 100, 125].filter((n) => n <= yMax).map((n) => (
              <g key={n}>
                <line
                  x1={0}
                  y1={yScale(n)}
                  x2={chartWidth}
                  y2={yScale(n)}
                  className={styles.gridLine}
                />
                <text
                  x={-8}
                  y={yScale(n)}
                  className={styles.axisLabel}
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {n}
                </text>
              </g>
            ))}
            {/* X-axis labels */}
            {sprintStats.map((s, i) => (
              <text
                key={s.sprint}
                x={(i / Math.max(sprintStats.length - 1, 1)) * chartWidth}
                y={chartHeight + 20}
                className={styles.axisLabel}
                textAnchor="middle"
              >
                {s.sprint}
              </text>
            ))}
            {/* Lines */}
            {mainCategories.map((cat, i) => (
              <path
                key={cat}
                d={linePath((s) => s.categories[cat] ?? 0)}
                fill="none"
                stroke={CATEGORY_COLORS[i]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.line}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className={styles.axisLabelX}>Sprint</div>
    </section>
  );
}
