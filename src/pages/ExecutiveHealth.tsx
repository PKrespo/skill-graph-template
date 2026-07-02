import { Gauge, Shield, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { executiveHealthSnapshot } from "@/data/executiveHealth";
import {
  errorSeries,
  latencySeries,
  reliabilitySeries,
} from "@/data/timeSeries";
import { incidents } from "@/data/incidents";
import { topErrorServices } from "@/data/services";
import { MissionControlGauge } from "@/components/charts/MissionControlGauge";
import { ReliabilitySignalsSection } from "@/components/charts/ReliabilitySignalsSection";
import { DashboardHeader } from "@/components/filters/DashboardHeader";
import { defaultFilters } from "@/data/filters";
import { BrokenNowPanel } from "@/components/panels/BrokenNowPanel";
import { ServicesErrorPanel } from "@/components/panels/ServicesErrorPanel";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusCard } from "@/components/ui/StatusCard";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { DashboardFilters } from "@/types/observability";

export function ExecutiveHealth() {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
  const data = executiveHealthSnapshot;

  const filteredIncidents = filters.onlyErrors
    ? incidents.filter((i) => i.status === "firing" || i.severity === "P1")
    : incidents;

  const filteredServices = filters.onlyErrors
    ? topErrorServices.filter((s) => s.errorRate >= 3)
    : topErrorServices;

  return (
    <div>
      <DashboardHeader
        filters={filters}
        onFiltersChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
      />

      <div className="space-y-4 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="SLO • Error Budget"
            value={`${data.slo.budgetLeft}%`}
            subtext={`budget left • burn ${data.slo.burnRate}x • target ${data.slo.target}%`}
            glow="danger"
          />
          <KpiCard
            label="APDEX • Experience"
            value={data.apdex.score.toFixed(2)}
            subtext={`${data.apdex.satisfiedPct}% satisfied • ${data.apdex.label}`}
            glow="success"
            progress={data.apdex.satisfiedPct}
            progressColor="var(--success)"
          />
          <KpiCard
            label="Uptime Streak"
            value={data.uptime.streak}
            subtext={`MTTR ${data.uptime.mttr} • MTBF ${data.uptime.mtbf}`}
            glow="success"
          />
          <KpiCard
            label="Availability"
            value={`${data.availability.pct.toFixed(2)}%`}
            subtext={`${data.availability.impacted} svc impacted • ${data.availability.downtimeMin}m down`}
            glow="danger"
            progress={data.availability.pct}
            progressColor="var(--danger)"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatusCard
            label="Healthy systems"
            value={`${data.healthySystems.pct}%`}
            icon={Shield}
            iconColor="var(--success)"
            subtext={
              <>
                <div>
                  {data.healthySystems.healthy}/{data.healthySystems.total}{" "}
                  serviços saudáveis
                </div>
                <div>
                  Downtime acumulado {data.healthySystems.downtimeHours}h (Last
                  24h)
                </div>
              </>
            }
          />
          <StatusCard
            label="Active incidents"
            value={data.activeIncidents.count}
            icon={TriangleAlert}
            iconColor="var(--warning)"
            subtext={
              <>
                <div>Estado firing/open</div>
                <div>
                  {data.activeIncidents.inScope} no escopo •{" "}
                  {data.activeIncidents.p1} P1
                </div>
              </>
            }
          />
          <StatusCard
            label="SLA breaches"
            value={data.slaBreaches.count}
            icon={TriangleAlert}
            iconColor="var(--danger)"
            subtext={
              <>
                <div>abaixo de {data.slaBreaches.threshold}% de disponibilidade</div>
                <div>SLA compliance lane</div>
              </>
            }
          />
          <StatusCard
            label="Weighted impact"
            value={data.weightedImpact.score}
            icon={Gauge}
            iconColor="var(--info)"
            subtext={
              <>
                <div>PROD ponderado — severidade × peso</div>
                <div>{data.weightedImpact.aiRecommendations} AI recommendations</div>
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(190px,0.9fr)_minmax(0,4.5fr)]">
          <SurfaceCard className="flex flex-col">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-text">Mission Control</h3>
              <span className="text-xs text-text-faint">health rings</span>
            </div>
            <MissionControlGauge
              healthyPct={data.missionControl.healthyPct}
              availability={data.missionControl.availability}
              latencyScore={data.missionControl.latencyScore}
              reliability={data.missionControl.reliability}
            />
          </SurfaceCard>
          <ReliabilitySignalsSection
            reliability={reliabilitySeries}
            latency={latencySeries}
            error={errorSeries}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BrokenNowPanel incidents={filteredIncidents} />
          <ServicesErrorPanel services={filteredServices} />
        </div>
      </div>
    </div>
  );
}
