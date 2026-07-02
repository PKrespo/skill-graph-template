import type { ReactNode } from "react";
import type { GlowVariant } from "@/types/observability";
import { glowClasses } from "./surfaceGlow";

interface SurfaceCardProps {
  children: ReactNode;
  glow?: GlowVariant;
  accent?: GlowVariant;
  padding?: "sm" | "md";
  className?: string;
}

const paddingClasses: Record<NonNullable<SurfaceCardProps["padding"]>, string> =
  {
    sm: "p-3",
    md: "p-4",
  };

const accentClasses: Record<GlowVariant, string> = {
  success: "surface-accent-success border-t-2",
  danger: "surface-accent-danger border-t-2",
  warning: "surface-accent-warning border-t-2",
  info: "surface-accent-info border-t-2",
  neutral: "surface-accent-neutral border-t-2",
  none: "",
};

const accentBorderColors: Record<GlowVariant, string | undefined> = {
  success: "var(--success)",
  danger: "var(--danger)",
  warning: "var(--warning)",
  info: "var(--info)",
  neutral: "rgba(255,255,255,0.35)",
  none: undefined,
};

export function SurfaceCard({
  children,
  glow = "none",
  accent = "none",
  padding = "md",
  className = "",
}: SurfaceCardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface/80 backdrop-blur-sm [border-radius:var(--surface-radius)] ${paddingClasses[padding]} ${glowClasses[glow]} ${accentClasses[accent]} ${className}`}
      style={
        accent === "none"
          ? undefined
          : { borderTopColor: accentBorderColors[accent] }
      }
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
