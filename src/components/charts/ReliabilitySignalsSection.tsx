import type { TimePoint } from "@/types/observability";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { ErrorTrendChart } from "./ErrorTrendChart";
import { LatencyChart } from "./LatencyChart";
import { ReliabilityChart } from "./ReliabilityChart";

interface ReliabilitySignalsSectionProps {
  reliability: TimePoint[];
  latency: TimePoint[];
  error: TimePoint[];
}

export function ReliabilitySignalsSection({
  reliability,
  latency,
  error,
}: ReliabilitySignalsSectionProps) {
  return (
    <SurfaceCard className="flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-text">Reliability signals</span>
        <span className="text-xs text-text-faint">aggregate over scope</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ReliabilityChart data={reliability} />
        <LatencyChart data={latency} />
        <ErrorTrendChart data={error} />
      </div>
    </SurfaceCard>
  );
}
