import {
  Activity,
  BarChart3,
  Bell,
  Brain,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  HardDrive,
  ScrollText,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { PageId } from "@/types/observability";
import { APP_VERSION, navGroups } from "./navConfig";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Code2,
  Bell,
  ScrollText,
  BarChart3,
  HardDrive,
  Database,
  Brain,
  Settings,
};

interface SidebarProps {
  activePage: PageId;
  onNavigate: (pageId: PageId) => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  activePage,
  onNavigate,
  collapsed = false,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-border bg-surface/60 backdrop-blur-md transition-all ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="relative border-b border-border px-3 py-3.5">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-info/20">
              <Activity className="h-4 w-4 text-info" />
            </div>
            {!collapsed && (
              <div>
                <div className="text-sm font-bold text-text">CoE Monitor</div>
                <div className="text-[10px] uppercase tracking-wider text-text-faint">
                  Internal • Dev
                </div>
              </div>
            )}
          </div>

          {onToggle && (
            <button
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={onToggle}
              className={`rounded-lg border border-border bg-surface/80 p-1.5 text-text-dim transition-colors hover:bg-white/5 hover:text-text ${
                collapsed ? "absolute right-3 top-3.5" : ""
              }`}
            >
              {collapsed ? (
                <ChevronRight className="h-3.5 w-3.5" />
              ) : (
                <ChevronLeft className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed && (
              <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                {group.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] ?? Activity;
                const isActive = item.pageId === activePage;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      disabled={!item.enabled}
                      title={
                        item.enabled
                          ? item.label
                          : `${item.label} — Coming soon`
                      }
                      onClick={() => {
                        if (item.enabled && item.pageId) {
                          onNavigate(item.pageId);
                        }
                      }}
                      className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? "border-l-2 border-info bg-info/10 text-info"
                          : item.enabled
                            ? "text-text-dim hover:bg-white/5 hover:text-text"
                            : "cursor-not-allowed text-text-faint opacity-50"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {!collapsed && !item.enabled && (
                        <span className="ml-auto text-[9px] uppercase text-text-faint">
                          soon
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-4 py-3">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2 text-xs text-text-dim">
              <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_6px_var(--success)]" />
              All systems operational
            </div>
            <div className="mt-1 text-[10px] text-text-faint">v{APP_VERSION}</div>
          </>
        ) : (
          <span className="mx-auto block h-2 w-2 rounded-full bg-success shadow-[0_0_6px_var(--success)]" />
        )}
      </div>
    </aside>
  );
}
