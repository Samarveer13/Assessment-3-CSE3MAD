import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart, ProgressChart } from 'react-native-chart-kit';

const CHART_WIDTH = Dimensions.get('window').width - 32;

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#f8faff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(10, 126, 164, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '5', strokeWidth: '2', stroke: '#0a7ea4' },
};

// ── Preset data sets ──────────────────────────────────────────────────────────

/** Bar chart — team scores per activity (out of 100) */
const ACTIVITY_SCORES = {
  labels: ['Breath', 'Quake', 'Fan', 'Para', 'Perf', 'React', 'Sound'],
  datasets: [{ data: [85, 72, 91, 68, 79, 88, 74] }],
};

/** Line chart — reaction time (ms) across 6 rounds, showing improvement */
const REACTION_TIMES = {
  labels: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6'],
  datasets: [
    {
      data: [420, 385, 350, 310, 290, 265],
      color: (opacity = 1) => `rgba(10, 126, 164, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['Reaction Time (ms)'],
};

/** Progress chart — completion rate per activity (0–1) */
const COMPLETION_RATES = {
  labels: ['Breath', 'Quake', 'Fan', 'Para', 'Perf', 'React'],
  data: [0.85, 0.72, 0.91, 0.68, 0.79, 0.88],
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type ChartType = 'bar' | 'line' | 'progress';

interface ResultsChartProps {
  /** Which chart style to render */
  type: ChartType;
  /** Optional heading shown above the chart */
  title?: string;
  /** Optional description shown below the title */
  description?: string;
  /**
   * Override the default data. Must match the shape expected by the chosen type:
   *   bar/line → { labels: string[], datasets: [{ data: number[] }] }
   *   progress → { labels: string[], data: number[] }
   */
  data?: typeof ACTIVITY_SCORES | typeof REACTION_TIMES | typeof COMPLETION_RATES;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ResultsChart({
  type,
  title,
  description,
  data,
}: ResultsChartProps) {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}

      {type === 'bar' && (
        <BarChart
          data={(data as typeof ACTIVITY_SCORES) ?? ACTIVITY_SCORES}
          width={CHART_WIDTH}
          height={210}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          style={styles.chart}
        />
      )}

      {type === 'line' && (
        <LineChart
          data={(data as typeof REACTION_TIMES) ?? REACTION_TIMES}
          width={CHART_WIDTH}
          height={210}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      )}

      {type === 'progress' && (
        <ProgressChart
          data={(data as typeof COMPLETION_RATES) ?? COMPLETION_RATES}
          width={CHART_WIDTH}
          height={230}
          chartConfig={chartConfig}
          hideLegend={false}
          style={styles.chart}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 17,
  },
  chart: { borderRadius: 16 },
});
