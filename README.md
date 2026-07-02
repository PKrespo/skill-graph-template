# UX Graph Template — Executive Health Dashboard Template

A React + TypeScript observability dashboard template inspired by the **UX Graph Template** Executive Health UX. Built with Vite, Tailwind CSS v4, custom SVG gauges, and Recharts.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
pnpm build    # production build
pnpm preview  # preview production build
```

## What's Included

- **App shell** — sidebar navigation with Monitoring / Explore / Platform groups
- **Executive Health page** — full dashboard with KPI cards, status metrics, charts, and incident panels
- **Mock data layer** — typed static data for KPIs, time-series, incidents, and services
- **Custom SVG gauge** — Mission Control concentric health rings
- **Recharts charts** — Reliability (area), Latency (line + area), Error Trend (area)
- **Dark theme** — neon accent colors matching the reference design

Other sidebar items are shown as disabled "coming soon" placeholders.

## Project Structure

```
src/
├── data/           # Mock data — swap for API calls here
├── types/          # TypeScript interfaces
├── layout/         # AppShell, Sidebar, nav config
├── components/
│   ├── ui/         # KpiCard, StatusCard, Badge, Button
│   ├── filters/    # DashboardHeader
│   ├── charts/     # MissionControlGauge + Recharts
│   └── panels/     # BrokenNow, ServicesError
├── pages/          # ExecutiveHealth, ComingSoon
└── styles/         # Theme tokens + Tailwind
```

## Extending the Template

### Connect real data

Replace imports in `src/pages/ExecutiveHealth.tsx`:

```ts
// Before
import { executiveHealthSnapshot } from "@/data/executiveHealth";

// After — fetch from your API
const { data } = useQuery({ queryKey: ["executive-health"], queryFn: fetchExecutiveHealth });
```

Mock modules to replace:

| File | Purpose |
|------|---------|
| `src/data/executiveHealth.ts` | KPI snapshot values |
| `src/data/timeSeries.ts` | Chart time-series (53 points) |
| `src/data/incidents.ts` | Active incidents list |
| `src/data/services.ts` | Top error-rate services |

### Add new pages

1. Add a `pageId` to `src/types/observability.ts`
2. Enable the nav item in `src/layout/navConfig.ts`
3. Create a page in `src/pages/`
4. Wire it in `src/App.tsx`

### Customize theme

Edit CSS variables in `src/styles/theme.css`:

```css
--success: #00e676;
--danger:  #ff1744;
--warning: #ffd600;
--info:    #00b0ff;
```

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Recharts 2
- Lucide React icons

## License

Private — Lumina Abundia internal template.
