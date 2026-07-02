import { ChevronDown, RotateCcw, Save, Search, Share2 } from "lucide-react";
import type { DashboardFilters } from "@/types/observability";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  onReset: () => void;
}

const TIME_RANGES = ["Last 1h", "Last 6h", "Last 24h", "Last 7d", "Last 30d"];

export function DashboardHeader({
  filters,
  onFiltersChange,
  onReset,
}: DashboardHeaderProps) {
  return (
    <div className="border-b border-border bg-surface/35 px-6 py-5 backdrop-blur-sm">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
        Internal Intelligent Observability Platform
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-text">Executive Health</h1>
        <Badge variant="success" className="px-2.5 py-1">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          Live
        </Badge>
      </div>
      <p className="mt-1 text-sm text-text-dim">
        Visão agregada para detectar o que está quebrado agora, priorizar
        resposta e correlacionar métricas, logs e alertas.
      </p>

      <div className="mt-5 rounded-xl border border-border bg-surface/50 p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex lg:min-w-[130px] lg:items-end">
            <Badge
              variant="info"
              className="w-full justify-center rounded-lg px-4 py-2 text-sm tracking-wider"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-info" />
              {filters.environment}
            </Badge>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
              <div className="flex flex-col gap-1 lg:w-44">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                  Time Range
                </label>
                <select
                  value={filters.timeRange}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, timeRange: e.target.value })
                  }
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text outline-none focus:border-info/50"
                >
                  {TIME_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div className="min-w-0 flex-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                  Search
                </label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-faint" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) =>
                      onFiltersChange({ ...filters, search: e.target.value })
                    }
                    placeholder='service="orders" level="error" host="srv-prod-01"'
                    className="w-full rounded-lg border border-border bg-surface py-1.5 pl-9 pr-3 font-mono text-xs text-text outline-none focus:border-info/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 lg:pb-0.5">
                <Button
                  variant={filters.onlyErrors ? "primary" : "outline"}
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      onlyErrors: !filters.onlyErrors,
                    })
                  }
                >
                  Only errors
                </Button>
                <Button variant="outline" onClick={onReset}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost">
                Views
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost">
                <Save className="h-3.5 w-3.5" />
                Save
              </Button>
              <Button variant="ghost">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
