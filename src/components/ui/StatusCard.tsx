import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { GlowVariant } from "@/types/observability";
import { SurfaceCard } from "./SurfaceCard";

interface StatusCardProps {
  label: string;
  value: ReactNode;
  subtext?: ReactNode;
  icon?: LucideIcon;
  iconColor?: string;
  glow?: GlowVariant;
  className?: string;
}

export function StatusCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor = "var(--text-dim)",
  glow = "none",
  className = "",
}: StatusCardProps) {
  return (
    <SurfaceCard glow={glow} className={`flex flex-col ${className}`}>
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-text-faint">
          {label}
        </span>
        {Icon && (
          <Icon className="h-4 w-4 shrink-0" style={{ color: iconColor }} />
        )}
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight text-text">
        {value}
      </div>
      {subtext && (
        <div className="mt-1 space-y-0.5 text-xs text-text-dim">{subtext}</div>
      )}
    </SurfaceCard>
  );
}
