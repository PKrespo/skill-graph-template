import type { TimePoint } from "@/types/observability";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function generateSeries(
  count: number,
  baseValue: number,
  variance: number,
  anomalyIndices: number[],
  anomalyMultiplier = 2.5,
): TimePoint[] {
  const now = new Date();
  const intervalMs = (24 * 60 * 60 * 1000) / count;

  return Array.from({ length: count }, (_, i) => {
    const time = new Date(now.getTime() - (count - 1 - i) * intervalMs);
    const wave = Math.sin(i * 0.4) * variance;
    const noise = (Math.random() - 0.5) * variance * 0.3;
    const isAnomaly = anomalyIndices.includes(i);
    const value = isAnomaly
      ? baseValue + variance * anomalyMultiplier
      : baseValue + wave + noise;

    return {
      time: formatTime(time),
      value: Math.round(value * 100) / 100,
      anomaly: isAnomaly,
    };
  });
}

const anomalyIndices = [12, 28, 45];

export const reliabilitySeries: TimePoint[] = generateSeries(
  53,
  98.5,
  1.2,
  anomalyIndices,
  1.8,
).map((p) => ({
  ...p,
  value: Math.min(100, Math.max(85, p.value)),
}));

export const latencySeries: TimePoint[] = generateSeries(
  53,
  180,
  80,
  anomalyIndices,
  4,
).map((p) => ({
  ...p,
  value: Math.max(50, p.value),
}));

export const errorSeries: TimePoint[] = generateSeries(
  53,
  0.8,
  0.4,
  [5, 12, 20],
  3,
).map((p) => ({
  ...p,
  value: Math.max(0.1, Math.min(4, p.value)),
}));

export const chartMeta = {
  pointCount: 53,
  anomalyCount: 3,
  reliabilitySla: 99,
  latencyBudget: 300,
  errorBudget: 1,
};
