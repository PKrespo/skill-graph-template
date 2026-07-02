import type { ServiceMetric } from "@/types/observability";

export const topErrorServices: ServiceMetric[] = [
  { name: "node.exe", port: 8206, errorRate: 8.2, p95Latency: 420 },
  { name: "orders-api", port: 3001, errorRate: 5.4, p95Latency: 310 },
  { name: "payment-gateway", port: 8080, errorRate: 3.1, p95Latency: 580 },
  { name: "auth-service", port: 4000, errorRate: 2.8, p95Latency: 190 },
  { name: "notification-worker", port: 9000, errorRate: 1.9, p95Latency: 240 },
];
