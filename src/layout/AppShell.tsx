import type { ReactNode } from "react";
import type { PageId } from "@/types/observability";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppShellProps {
  activePage: PageId;
  onNavigate: (pageId: PageId) => void;
  children: ReactNode;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebarCollapsed: () => void;
}

export function AppShell({
  activePage,
  onNavigate,
  children,
  sidebarOpen,
  onToggleSidebar,
  sidebarCollapsed,
  onToggleSidebarCollapsed,
}: AppShellProps) {
  return (
    <div className="flex h-full overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activePage={activePage}
          collapsed={sidebarCollapsed}
          onToggle={onToggleSidebarCollapsed}
          onNavigate={(page) => {
            onNavigate(page);
            if (window.innerWidth < 1024) onToggleSidebar();
          }}
        />
      </div>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar onToggleSidebar={onToggleSidebar} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
