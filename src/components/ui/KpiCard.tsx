import type { ReactNode } from "react";
import type { GlowVariant } from "@/types/observability";
import { SurfaceCard } from "./SurfaceCard";

interface KpiCardProps {
  label: string;
  value: ReactNode;
  subtext?: ReactNode;
  glow?: GlowVariant;
  progress?: number;
  progressColor?: string;
  className?: string;
}

export function KpiCard({
  label,
  value,
  subtext,
  glow = "none",
  progress,
  progressColor = "var(--success)",
  className = "",
}: KpiCardProps) {
  const accent = glow === "none" ? "neutral" : glow;

  return (
    <SurfaceCard
      glow="none"
      accent={accent}
      className={`flex flex-col ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-text-faint">
        {label}
      </span>
      <div className="mt-2 text-3xl font-bold tracking-tight text-text">
        {value}
      </div>
      {subtext && (
        <div className="mt-1 text-xs text-text-dim">{subtext}</div>
      )}
      {progress !== undefined && (
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              backgroundColor: progressColor,
              boxShadow: `0 0 8px ${progressColor}66`,
            }}
          />
        </div>
      )}
    </SurfaceCard>
  );
}
