import type { ServiceMetric } from "@/types/observability";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

interface ServicesErrorPanelProps {
  services: ServiceMetric[];
}

export function ServicesErrorPanel({ services }: ServicesErrorPanelProps) {
  return (
    <SurfaceCard className="flex flex-col">
      <h3 className="mb-3 text-sm font-semibold text-text">
        Services with highest error rate
      </h3>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li
            key={service.name}
            className="flex items-center justify-between rounded-lg border border-border/60 bg-surface-2/50 px-3 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger/15 text-xs font-bold text-danger">
                {index + 1}
              </span>
              <div>
                <div className="text-sm font-medium text-text">
                  {service.name}
                  <span className="ml-1 text-text-faint">(:{service.port})</span>
                </div>
                <div className="text-xs text-text-dim">
                  p95 {service.p95Latency}ms
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-danger">
                {service.errorRate}%
              </div>
              <div className="text-[10px] text-text-faint">error rate</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-end text-xs text-text-dim">
        <button type="button" className="text-info hover:underline">
          Inspect logs
        </button>
      </div>
    </SurfaceCard>
  );
}
