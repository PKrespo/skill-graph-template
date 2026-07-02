import type { ExecutiveHealthSnapshot } from "@/types/observability";

export const executiveHealthSnapshot: ExecutiveHealthSnapshot = {
  slo: {
    budgetLeft: 0,
    burnRate: 22,
    target: 99,
  },
  apdex: {
    score: 0.92,
    satisfiedPct: 92,
    label: "Good",
  },
  uptime: {
    streak: "37s",
    mttr: "73.1m",
    mtbf: "0.1h",
  },
  availability: {
    pct: 78.0,
    impacted: 6,
    downtimeMin: 180,
  },
  healthySystems: {
    pct: 42.9,
    healthy: 6,
    total: 14,
    downtimeHours: 61.6,
  },
  activeIncidents: {
    count: 9,
    firing: 5,
    open: 4,
    inScope: 20,
    p1: 0,
  },
  slaBreaches: {
    count: 8,
    threshold: 99,
  },
  weightedImpact: {
    score: 1.8,
    aiRecommendations: 20,
  },
  missionControl: {
    healthyPct: 43,
    availability: 82,
    latencyScore: 72,
    reliability: 8,
  },
};
