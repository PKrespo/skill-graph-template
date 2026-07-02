import {
  Area,
  AreaChart,
  CartesianGrid,
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

interface ErrorTrendChartProps {
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
      <div className="font-semibold text-danger">{payload[0].value}%</div>
    </div>
  );
}

export function ErrorTrendChart({ data }: ErrorTrendChartProps) {
  return (
    <ChartCard
      title="Error trend"
      badges={
        <>
          <Badge variant="danger">budget {chartMeta.errorBudget}%</Badge>
          <Badge variant="neutral">
            {chartMeta.pointCount} pts • {chartMeta.anomalyCount} anomaly
          </Badge>
        </>
      }
    >
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="errorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--danger)" stopOpacity={0.02} />
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
            domain={[0, 4]}
            tick={{ fill: "var(--text-faint)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<DarkTooltip />} />
          <ReferenceArea
            y1={0}
            y2={chartMeta.errorBudget}
            fill="var(--success)"
            fillOpacity={0.06}
          />
          <ReferenceLine
            y={chartMeta.errorBudget}
            stroke="var(--danger)"
            strokeDasharray="4 4"
            strokeOpacity={0.7}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--danger)"
            strokeWidth={2.5}
            fill="url(#errorGrad)"
            className="chart-glow-red"
            dot={<AnomalyDot />}
            activeDot={{ r: 5, fill: "var(--danger)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
