type Props = { name: string; className?: string };

// Saare drawings 400x320 ke box mein hain.
// stroke-moon / fill-sky theme ke saath khud badalte hain.
export default function ServiceArt({ name, className }: Props) {
  const common = {
    viewBox: "0 0 400 320",
    fill: "none",
    className,
    "aria-hidden": true as const,
  };

  // 1) FRONTEND: browser window + code lines
  if (name === "frontend") {
    return (
      <svg {...common}>
        <rect x="50" y="40" width="300" height="240" rx="22" className="stroke-moon" strokeWidth="3" />
        <path d="M50 90h300" className="stroke-moon" strokeWidth="3" />
        <circle cx="80" cy="65" r="6" className="fill-sky" />
        <circle cx="102" cy="65" r="6" className="fill-moon/60" />
        <circle cx="124" cy="65" r="6" className="fill-moon/30" />
        <g strokeWidth="9" strokeLinecap="round">
          <path d="M80 130h90" className="stroke-sky" />
          <path d="M100 160h140" className="stroke-moon/70" />
          <path d="M100 190h70" className="stroke-moon/40" />
          <path d="M80 220h110" className="stroke-sky" />
          <path d="M80 250h60" className="stroke-moon/40" />
        </g>
        <text x="300" y="215" textAnchor="middle" fontSize="54" className="fill-sky" fontFamily="monospace">
          {"</>"}
        </text>
      </svg>
    );
  }

  // 2) BACKEND: server stack + database
  if (name === "backend") {
    return (
      <svg {...common}>
        {[50, 120, 190].map((y, i) => (
          <g key={y}>
            <rect x="50" y={y} width="190" height="54" rx="14" className="stroke-moon" strokeWidth="3" />
            <circle cx="80" cy={y + 27} r="6" className={i === 1 ? "fill-sky" : "fill-moon/50"} />
            <path d={`M110 ${y + 27}h100`} className="stroke-moon/40" strokeWidth="6" strokeLinecap="round" />
          </g>
        ))}
        {/* Database cylinder */}
        <ellipse cx="320" cy="90" rx="50" ry="18" className="stroke-sky" strokeWidth="3" />
        <path d="M270 90v110c0 10 22 18 50 18s50-8 50-18V90" className="stroke-sky" strokeWidth="3" />
        <path d="M270 145c0 10 22 18 50 18s50-8 50-18" className="stroke-sky" strokeWidth="3" />
        {/* Connection */}
        <path d="M240 147h30" className="stroke-moon" strokeWidth="3" strokeDasharray="6 6" />
      </svg>
    );
  }

  // 3) AI: chip + pins + sparkle
  if (name === "ai") {
    return (
      <svg {...common}>
        <rect x="120" y="80" width="160" height="160" rx="28" className="stroke-moon" strokeWidth="3" />
        <rect x="155" y="115" width="90" height="90" rx="18" className="fill-sky/25 stroke-sky" strokeWidth="3" />
        <text x="200" y="175" textAnchor="middle" fontSize="44" fontWeight="700" className="fill-moon" fontFamily="sans-serif">
          AI
        </text>
        <g className="stroke-moon" strokeWidth="3" strokeLinecap="round">
          {[150, 200, 250].map((p) => (
            <g key={p}>
              <path d={`M${p} 80V50`} />
              <path d={`M${p} 240v30`} />
              <path d={`M120 ${p - 70}H90`} />
              <path d={`M280 ${p - 70}h30`} />
            </g>
          ))}
        </g>
        {/* Sparkles */}
        <path d="M335 60l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" className="fill-sky" />
        <path d="M65 250l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" className="fill-moon/70" />
      </svg>
    );
  }

  // 4) CLOUD & DEVOPS: badal + upload arrow + pipeline
  return (
    <svg {...common}>
      <path
        d="M120 190a40 40 0 0 1 5-80a60 60 0 0 1 115-10a50 50 0 0 1 35 90z"
        className="stroke-moon"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M200 175v-50M178 147l22-22 22 22" className="stroke-sky" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pipeline */}
      <path d="M70 265h260" className="stroke-moon/40" strokeWidth="3" strokeDasharray="6 6" />
      {[70, 160, 250, 330].map((x, i) => (
        <circle key={x} cx={x} cy="265" r="12" className={i === 3 ? "fill-sky" : "fill-night stroke-moon"} strokeWidth="3" />
      ))}
    </svg>
  );
}