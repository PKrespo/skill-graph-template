import { useState } from "react";
import { AppShell } from "@/layout/AppShell";
import { ExecutiveHealth } from "@/pages/ExecutiveHealth";
import type { PageId } from "@/types/observability";

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("executive-health");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppShell
      activePage={activePage}
      onNavigate={setActivePage}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((open) => !open)}
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebarCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)}
    >
      {activePage === "executive-health" && <ExecutiveHealth />}
    </AppShell>
  );
}
