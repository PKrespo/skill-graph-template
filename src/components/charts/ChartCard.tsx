import type { ReactNode } from "react";
import type { GlowVariant } from "@/types/observability";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  badges?: ReactNode;
  children: ReactNode;
  glow?: GlowVariant;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  badges,
  children,
  glow = "none",
  className = "",
}: ChartCardProps) {
  return (
    <SurfaceCard glow={glow} className={`flex flex-col ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-text">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-text-faint">{subtitle}</p>
          )}
        </div>
        {badges && <div className="flex flex-wrap gap-1.5">{badges}</div>}
      </div>
      <div className="flex-1">{children}</div>
    </SurfaceCard>
  );
}
