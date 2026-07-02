import { useEffect, useState } from "react";

interface MissionControlGaugeProps {
  healthyPct: number;
  availability: number;
  latencyScore: number;
  reliability: number;
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

interface RingConfig {
  radius: number;
  value: number;
  color: string;
  trackColor: string;
  strokeWidth: number;
}

function Ring({
  cx,
  cy,
  config,
  animated,
}: {
  cx: number;
  cy: number;
  config: RingConfig;
  animated: boolean;
}) {
  const startAngle = 135;
  const totalAngle = 270;
  const sweep = (config.value / 100) * totalAngle;
  const endAngle = startAngle + sweep;

  const trackPath = describeArc(cx, cy, config.radius, startAngle, startAngle + totalAngle);
  const valuePath =
    sweep > 0 ? describeArc(cx, cy, config.radius, startAngle, endAngle) : "";

  const circumference = 2 * Math.PI * config.radius * (totalAngle / 360);

  return (
    <g>
      <path
        d={trackPath}
        fill="none"
        stroke={config.trackColor}
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
      />
      {valuePath && (
        <path
          d={valuePath}
          fill="none"
          stroke={config.color}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? 0 : circumference}
          style={{
            transition: "stroke-dashoffset 1s ease-out",
            filter: `drop-shadow(0 0 4px ${config.color}88)`,
          }}
        />
      )}
    </g>
  );
}

export function MissionControlGauge({
  healthyPct,
  availability,
  latencyScore,
  reliability,
}: MissionControlGaugeProps) {
  const [animated, setAnimated] = useState(false);
  const cx = 120;
  const cy = 120;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const rings: RingConfig[] = [
    {
      radius: 95,
      value: availability,
      color: "var(--warning)",
      trackColor: "rgba(255,214,0,0.1)",
      strokeWidth: 10,
    },
    {
      radius: 75,
      value: latencyScore,
      color: "var(--danger)",
      trackColor: "rgba(255,23,68,0.1)",
      strokeWidth: 10,
    },
    {
      radius: 55,
      value: reliability * 10,
      color: "var(--text-faint)",
      trackColor: "rgba(255,255,255,0.05)",
      strokeWidth: 8,
    },
  ];

  const legend = [
    { label: "Availability", value: `${availability}%`, color: "var(--warning)" },
    { label: "Latency score", value: String(latencyScore), color: "var(--danger)" },
    { label: "Reliability", value: String(reliability), color: "var(--text-faint)" },
  ];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 240 200"
        className="w-full max-w-[280px]"
        role="img"
        aria-label={`Mission control health gauge: ${healthyPct}% healthy`}
      >
        {rings.map((ring) => (
          <Ring key={ring.radius} cx={cx} cy={cy} config={ring} animated={animated} />
        ))}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          className="fill-text text-3xl font-bold"
          style={{ fontSize: "28px", fontWeight: 700, fill: "var(--text)" }}
        >
          {healthyPct}%
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          style={{ fontSize: "11px", fill: "var(--text-dim)", letterSpacing: "0.1em" }}
        >
          HEALTHY
        </text>
      </svg>

      <div className="mt-2 flex w-full flex-wrap justify-center gap-4">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs text-text-dim">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
            <span className="font-semibold text-text">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
