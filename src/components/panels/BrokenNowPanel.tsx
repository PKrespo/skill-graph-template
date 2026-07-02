import { AlertTriangle } from "lucide-react";
import type { Incident } from "@/types/observability";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

interface BrokenNowPanelProps {
  incidents: Incident[];
}

export function BrokenNowPanel({ incidents }: BrokenNowPanelProps) {
  return (
    <SurfaceCard className="flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">What is broken now?</h3>
        <Button variant="ghost" size="sm">
          Open Alert Center
        </Button>
      </div>
      <ul className="space-y-2">
        {incidents.map((incident) => (
          <li
            key={incident.id}
            className="flex items-start gap-3 rounded-lg border border-border/60 bg-surface-2/50 px-3 py-2.5"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant={incident.status === "firing" ? "danger" : "warning"}>
                  {incident.status.toUpperCase()}
                </Badge>
                <span className="text-xs text-text-faint">{incident.severity}</span>
              </div>
              <p className="mt-1 text-sm text-text">{incident.title}</p>
              <p className="text-xs text-text-dim">target: {incident.target}</p>
            </div>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}
