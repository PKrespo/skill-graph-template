import type { Incident } from "@/types/observability";

export const incidents: Incident[] = [
  {
    id: "inc-001",
    title: "Intermittent failures on target",
    target: "Team Apps",
    status: "open",
    severity: "P2",
  },
  {
    id: "inc-002",
    title: "High error rate detected",
    target: "node.exe (:8206)",
    status: "firing",
    severity: "P1",
  },
  {
    id: "inc-003",
    title: "SLA breach — availability below 99%",
    target: "orders-api",
    status: "open",
    severity: "P2",
  },
  {
    id: "inc-004",
    title: "Latency spike above budget",
    target: "payment-gateway",
    status: "firing",
    severity: "P3",
  },
  {
    id: "inc-005",
    title: "Disk usage critical",
    target: "srv-prod-01",
    status: "open",
    severity: "P2",
  },
];
