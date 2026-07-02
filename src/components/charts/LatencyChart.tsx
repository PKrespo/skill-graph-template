import {
  Area,
  ComposedChart,
  CartesianGrid,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimePoint } from "@/types/observability";
import { chartMeta } from "@/data/timeSeries";
import { Badge } from "@/components/ui/Badge";
import { ChartCard } from "./ChartCard";

interface LatencyChartProps {
  data: TimePoint[];
}

function AnomalyDot(props: {
  cx?: number;
  cy?: number;
  payload?: TimePoint;
}) {
  const { cx, cy, payload } = props;
  if (!payload?.anomaly || cx === undefined || cy === undefined) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="var(--danger)"
      stroke="var(--text)"
      strokeWidth={1.5}
    />
  );
}

function DarkTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 text-xs shadow-xl">
      <div className="text-text-faint">{label}</div>
      <div className="font-semibold text-info">{payload[0].value}ms</div>
    </div>
  );
}

export function LatencyChart({ data }: LatencyChartProps) {
  return (
    <ChartCard
      title="Aggregated latency"
      badges={
        <>
          <Badge variant="warning">budget {chartMeta.latencyBudget}ms</Badge>
          <Badge variant="neutral">
            {chartMeta.pointCount} pts • {chartMeta.anomalyCount} anomaly
          </Badge>
        </>
      }
    >
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--info)" stopOpacity={0.16} />
              <stop offset="100%" stopColor="var(--info)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tick={{ fill: "var(--text-faint)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 800]}
            tick={{ fill: "var(--text-faint)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<DarkTooltip />} />
          <ReferenceArea
            y1={0}
            y2={chartMeta.latencyBudget}
            fill="var(--success)"
            fillOpacity={0.06}
          />
          <ReferenceLine
            y={chartMeta.latencyBudget}
            stroke="var(--warning)"
            strokeDasharray="4 4"
            strokeOpacity={0.7}
          />
          <Area
            type="monotone"
            dataKey="value"
            fill="url(#latencyGrad)"
            stroke="none"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--info)"
            strokeWidth={2.5}
            dot={<AnomalyDot />}
            activeDot={{ r: 5, fill: "var(--info)" }}
            className="chart-glow-cyan"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
