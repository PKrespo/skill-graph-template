import {
  Bell,
  ChevronDown,
  Clock3,
  Download,
  Menu,
  RefreshCw,
  Search,
  Share2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface TopBarProps {
  onToggleSidebar: () => void;
}

function formatClock(now: Date): { time: string; ago: string } {
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const ago = `${now.getSeconds()}s ago`;
  return { time, ago };
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const clock = useMemo(() => formatClock(now), [now]);

  return (
    <header className="flex items-center justify-between gap-3 border-b border-border bg-surface/60 px-4 py-2.5 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          className="rounded-lg p-1.5 text-text-dim hover:bg-white/5 hover:text-text lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-1 rounded-md border border-success/30 bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          DEV
        </span>

        <button
          type="button"
          className="hidden items-center gap-1 rounded-md border border-border bg-surface/80 px-2.5 py-1 text-xs text-text-dim hover:text-text md:inline-flex"
        >
          <Clock3 className="h-3.5 w-3.5" />
          Last 24h
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        <div className="relative hidden min-w-[320px] flex-1 md:block xl:min-w-[420px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-faint" />
          <input
            type="text"
            value={'env="dev" host="winsrv" level="E5"'}
            readOnly
            className="w-full rounded-md border border-border bg-surface/80 py-1 pl-8 pr-12 text-xs text-text-dim outline-none"
            aria-label="Global search"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-text-faint">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="hidden items-center gap-1 text-[11px] text-text-dim lg:flex">
          <span className="font-medium text-text">{clock.time}</span>
          <span>· {clock.ago}</span>
        </div>

        <button
          type="button"
          className="rounded-md p-1.5 text-text-dim hover:bg-white/5 hover:text-text"
          aria-label="Refresh"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="rounded-md p-1.5 text-text-dim hover:bg-white/5 hover:text-text"
          aria-label="Download"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="rounded-md p-1.5 text-text-dim hover:bg-white/5 hover:text-text"
          aria-label="Share"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          className="relative rounded-md p-1.5 text-text-dim hover:bg-white/5 hover:text-text"
          aria-label="Notifications"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/90 px-2 py-0.5 text-xs text-text"
          aria-label="User menu"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-info/20 text-[10px] font-semibold text-info">
            A
          </span>
          <span className="hidden sm:inline">admin</span>
          <ChevronDown className="h-3.5 w-3.5 text-text-dim" />
        </button>
      </div>
    </header>
  );
}
