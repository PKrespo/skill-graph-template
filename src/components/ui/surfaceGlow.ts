import type { GlowVariant } from "@/types/observability";

const glowClasses: Record<GlowVariant, string> = {
  success: "surface-glow-success",
  danger: "surface-glow-danger",
  warning: "surface-glow-warning",
  info: "surface-glow-info",
  neutral: "surface-glow-neutral",
  none: "",
};

export function surfaceGlowClass(glow: GlowVariant = "none"): string {
  return glowClasses[glow];
}

export { glowClasses };
