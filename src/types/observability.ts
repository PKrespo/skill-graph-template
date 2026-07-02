export interface TimePoint {
  time: string;
  value: number;
  anomaly?: boolean;
}

export interface ExecutiveHealthSnapshot {
  slo: {
    budgetLeft: number;
    burnRate: number;
    target: number;
  };
  apdex: {
    score: number;
    satisfiedPct: number;
    label: string;
  };
  uptime: {
    streak: string;
    mttr: string;
    mtbf: string;
  };
  availability: {
    pct: number;
    impacted: number;
    downtimeMin: number;
  };
  healthySystems: {
    pct: number;
    healthy: number;
    total: number;
    downtimeHours: number;
  };
  activeIncidents: {
    count: number;
    firing: number;
    open: number;
    inScope: number;
    p1: number;
  };
  slaBreaches: {
    count: number;
    threshold: number;
  };
  weightedImpact: {
    score: number;
    aiRecommendations: number;
  };
  missionControl: {
    healthyPct: number;
    availability: number;
    latencyScore: number;
    reliability: number;
  };
}

export interface Incident {
  id: string;
  title: string;
  target: string;
  status: "open" | "firing";
  severity: "P1" | "P2" | "P3";
}

export interface ServiceMetric {
  name: string;
  port: number;
  errorRate: number;
  p95Latency: number;
}

export type GlowVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral"
  | "none";

export type PageId = "executive-health";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  pageId?: PageId;
  enabled: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface DashboardFilters {
  environment: string;
  timeRange: string;
  search: string;
  onlyErrors: boolean;
}
