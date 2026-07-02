import type { NavGroup } from "@/types/observability";

export const navGroups: NavGroup[] = [
  {
    title: "Monitoring",
    items: [
      {
        id: "executive-health",
        label: "Executive Health",
        icon: "Activity",
        pageId: "executive-health",
        enabled: true,
      },
      {
        id: "desenvolvimento",
        label: "Desenvolvimento",
        icon: "Code2",
        enabled: false,
      },
      {
        id: "alert-center",
        label: "Alert Center",
        icon: "Bell",
        enabled: false,
      },
    ],
  },
  {
    title: "Explore",
    items: [
      {
        id: "logs-explorer",
        label: "Logs Explorer",
        icon: "ScrollText",
        enabled: false,
      },
      {
        id: "capacity-planning",
        label: "Capacity Planning",
        icon: "BarChart3",
        enabled: false,
      },
      {
        id: "disk-monitoring",
        label: "Disk Monitoring",
        icon: "HardDrive",
        enabled: false,
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        id: "data-sources",
        label: "Data Sources",
        icon: "Database",
        enabled: false,
      },
      {
        id: "ai-engine",
        label: "AI Engine",
        icon: "Brain",
        enabled: false,
      },
      {
        id: "settings",
        label: "Settings",
        icon: "Settings",
        enabled: false,
      },
    ],
  },
];

export const APP_VERSION = "0.1.0";
