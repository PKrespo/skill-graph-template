import type { DashboardFilters } from "@/types/observability";

export const defaultFilters: DashboardFilters = {
  environment: "DEV",
  timeRange: "Last 24h",
  search: 'service="orders" level="error" host="srv-prod-01"',
  onlyErrors: false,
};
