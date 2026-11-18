/**
 * Night-time backdrop for the emergency section: crescent moon, stars, a small
 * house with lit yellow windows, and shrubs. Pure SVG, no external assets.
 * Near-black only — yellow is the single accent.
 */
export function NightScene({ className }: { className?: string }) {
  const stars = [
    [40, 40], [120, 22], [210, 60], [300, 30], [360, 78], [250, 120], [70, 120], [420, 40], [150, 95], [330, 150],
  ];
  return (
    <svg viewBox="0 0 520 340" preserveAspectRatio="xMinYMax slice" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1d22" />
          <stop offset="1" stopColor="#111111" />
        </linearGradient>
      </defs>
      <rect width="520" height="340" fill="url(#sky)" />
      {stars.map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y - 6}L${x + 1.6} ${y - 1.6}L${x + 6} ${y}L${x + 1.6} ${y + 1.6}L${x} ${y + 6}L${x - 1.6} ${y + 1.6}L${x - 6} ${y}L${x - 1.6} ${y - 1.6}Z`}
          fill="#ffffff"
          opacity={i % 3 === 0 ? 0.95 : 0.6}
          transform={i % 2 ? `scale(0.75) translate(${x / 3} ${y / 3})` : undefined}
        />
      ))}
      {/* crescent moon */}
      <path d="M118 28a34 34 0 1 0 38 50a28 28 0 1 1 -38 -50z" fill="#FFCC00" stroke="#111" strokeWidth="2" />

      {/* ground */}
      <path d="M0 300c90-14 220-16 520-6v46H0z" fill="#0b0b0c" />

      {/* house */}
      <g stroke="#e9e9e9" strokeWidth="3" strokeLinejoin="round">
        <path d="M28 196 128 130l100 66" fill="#26262b" />
        <path d="M44 186v112h168V186" fill="#2c2c31" />
        <path d="M18 202 128 126l110 76" fill="none" strokeWidth="5" />
        <rect x="160" y="132" width="20" height="30" fill="#26262b" />
        {/* windows */}
        <rect x="60" y="212" width="40" height="34" fill="#FFCC00" />
        <path d="M80 212v34M60 229h40" stroke="#111" strokeWidth="2.5" />
        <rect x="156" y="212" width="40" height="34" fill="#FFCC00" />
        <path d="M176 212v34M156 229h40" stroke="#111" strokeWidth="2.5" />
        <rect x="112" y="152" width="32" height="24" fill="#FFCC00" />
        <path d="M128 152v24" stroke="#111" strokeWidth="2.5" />
        {/* door */}
        <rect x="112" y="234" width="32" height="64" fill="#FFCC00" />
        <circle cx="137" cy="268" r="2.5" fill="#111" stroke="none" />
        {/* porch light */}
        <circle cx="152" cy="226" r="4" fill="#FFCC00" />
      </g>

      {/* shrubs */}
      <g fill="#18181b" stroke="#d6d6d6" strokeWidth="2.5">
        <path d="M-10 300c0-26 14-46 34-46 10-16 34-16 42 2 18-4 30 12 26 30 10 2 14 8 14 14z" />
        <path d="M206 300c-4-18 8-34 24-32 6-14 28-14 34 0 16-2 26 12 22 32z" />
      </g>
      <g stroke="#d6d6d6" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M14 282c6-4 12-4 18 0M44 270c6-4 12-4 18 0M226 286c6-4 10-4 16 0M254 278c6-4 10-4 16 0" />
      </g>
    </svg>
  );
}
