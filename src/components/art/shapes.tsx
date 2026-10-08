/**
 * Small SVG building blocks for the produce illustrations.
 * Pure shapes, no gradient ids, so they can be reused any number of times
 * on a page without id collisions.
 */

type P = { x: number; y: number; s?: number; r?: number };

const t = (x: number, y: number, s = 1, r = 0) =>
  `translate(${x} ${y}) rotate(${r}) scale(${s})`;

export function Shadow({ x, y, w = 40, o = 0.18 }: { x: number; y: number; w?: number; o?: number }) {
  return <ellipse cx={x} cy={y} rx={w / 2} ry={w / 9} fill="#000" opacity={o} />;
}

export function Leaf({ x, y, s = 1, r = 0, c = "#3f9d4a" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M0 0 C 6 -14 22 -18 30 -12 C 24 -2 10 4 0 0 Z" fill={c} />
      <path d="M2 -1 C 10 -7 18 -10 27 -11" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" fill="none" />
    </g>
  );
}

export function Orange({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <circle r="20" fill="#f47735" />
      <circle r="20" fill="#d9601f" opacity=".35" transform="translate(5 6) scale(.85)" />
      <circle cx="-7" cy="-8" r="6" fill="#fff" opacity=".28" />
      <circle cx="0" cy="-19" r="2.2" fill="#6b4a1f" />
      <Leaf x={1} y={-19} s={0.55} r={-20} />
    </g>
  );
}

export function Lemon({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-22 0 C -22 -14 -10 -17 0 -17 C 10 -17 22 -14 22 0 C 22 14 10 17 0 17 C -10 17 -22 14 -22 0 Z" fill="#f6cf3a" />
      <path d="M-25 0 L -21 -3 L -21 3 Z M 25 0 L 21 -3 L 21 3 Z" fill="#e9b820" />
      <ellipse cx="-7" cy="-7" rx="7" ry="4" fill="#fff" opacity=".35" />
    </g>
  );
}

export function Apple({ x, y, s = 1, r = 0, c = "#d6363f" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M0 -14 C -10 -22 -24 -16 -22 0 C -20 14 -10 20 0 16 C 10 20 20 14 22 0 C 24 -16 10 -22 0 -14 Z" fill={c} />
      <path d="M0 -14 C 8 -20 20 -16 21 -4 C 14 -12 6 -12 0 -14 Z" fill="#000" opacity=".1" />
      <ellipse cx="-10" cy="-6" rx="4" ry="6" fill="#fff" opacity=".3" />
      <path d="M0 -14 C 0 -20 2 -24 4 -26" stroke="#5b3a1a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <Leaf x={3} y={-22} s={0.5} r={-30} />
    </g>
  );
}

export function Banana({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-30 -6 C -18 18 18 22 34 2 C 36 0 34 -3 31 -2 C 14 10 -12 6 -26 -10 Z" fill="#f4c53a" />
      <path d="M-30 -6 C -18 18 18 22 34 2 C 20 14 -12 14 -30 -6 Z" fill="#d9a520" opacity=".6" />
      <path d="M-26 -10 L -31 -14 L -32 -9 Z" fill="#6b4a1f" />
    </g>
  );
}

export function Grapes({ x, y, s = 1, r = 0 }: P) {
  const pts = [
    [0, 0], [-9, -2], [9, -2], [-4, 8], [5, 8], [0, 16], [-14, -10], [0, -11], [14, -10],
  ];
  return (
    <g transform={t(x, y, s, r)}>
      {pts.map(([px, py], i) => (
        <g key={i}>
          <circle cx={px} cy={py} r="7" fill="#7b3f8c" />
          <circle cx={(px ?? 0) - 2} cy={(py ?? 0) - 2} r="2" fill="#fff" opacity=".35" />
        </g>
      ))}
      <path d="M0 -17 L 2 -26" stroke="#5b3a1a" strokeWidth="2.4" strokeLinecap="round" />
      <Leaf x={2} y={-22} s={0.6} r={-15} c="#58a84a" />
    </g>
  );
}

export function Tomato({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <ellipse rx="20" ry="17" fill="#e2412f" />
      <ellipse rx="20" ry="17" fill="#000" opacity=".1" transform="translate(4 4) scale(.8)" />
      <ellipse cx="-8" cy="-6" rx="5" ry="3.5" fill="#fff" opacity=".35" />
      <path d="M0 -16 l -8 -3 l 5 5 l -8 3 l 9 -1 l 2 6 l 2 -6 l 9 1 l -8 -3 l 5 -5 Z" fill="#3f9d4a" />
    </g>
  );
}

export function Avocado({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M0 -26 C 10 -26 14 -14 16 -2 C 19 14 12 24 0 24 C -12 24 -19 14 -16 -2 C -14 -14 -10 -26 0 -26 Z" fill="#3d5c26" />
      <path d="M0 -21 C 8 -21 11 -11 12 -1 C 14 11 9 19 0 19 C -9 19 -14 11 -12 -1 C -11 -11 -8 -21 0 -21 Z" fill="#d8e58c" />
      <circle cx="0" cy="6" r="8" fill="#8a5a2b" />
      <circle cx="-2.5" cy="3.5" r="2.5" fill="#fff" opacity=".3" />
    </g>
  );
}

export function Broccoli({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-5 0 L -7 22 L 7 22 L 5 0 Z" fill="#9cc56a" />
      {[
        [-14, -6, 11], [0, -12, 13], [14, -6, 11], [-6, 2, 9], [7, 2, 9],
      ].map(([cx, cy, rr], i) => (
        <circle key={i} cx={cx} cy={cy} r={rr} fill={i % 2 ? "#2f7d3a" : "#3b8f45"} />
      ))}
      <circle cx="-4" cy="-16" r="4" fill="#fff" opacity=".15" />
    </g>
  );
}

export function Carrot({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-8 -20 C -8 -24 8 -24 8 -20 L 2 26 C 1 29 -1 29 -2 26 Z" fill="#f08a2c" />
      <path d="M-5 -10 l 5 1 M -4 0 l 6 1 M -3 10 l 4 1" stroke="#c96515" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M0 -22 C -6 -34 -10 -36 -12 -36 M0 -22 C 0 -34 2 -38 3 -40 M0 -22 C 6 -32 10 -34 12 -34" stroke="#3f9d4a" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function Pepper({ x, y, s = 1, r = 0, c = "#e7392a" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-16 -10 C -22 4 -16 22 -6 22 C -2 22 0 18 0 18 C 0 18 2 22 6 22 C 16 22 22 4 16 -10 C 10 -16 -10 -16 -16 -10 Z" fill={c} />
      <ellipse cx="-8" cy="-2" rx="3" ry="8" fill="#fff" opacity=".3" />
      <path d="M0 -14 C 0 -20 4 -22 8 -22" stroke="#3f9d4a" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function Aubergine({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-6 -16 C -18 -6 -20 14 -10 24 C 0 32 16 26 18 12 C 20 -2 10 -12 6 -16 Z" fill="#4b2a5e" />
      <ellipse cx="-8" cy="6" rx="3" ry="9" fill="#fff" opacity=".22" transform="rotate(-15)" />
      <path d="M-8 -16 C -4 -22 4 -22 8 -16 L 4 -12 L 0 -16 L -4 -12 Z" fill="#3f9d4a" />
      <path d="M0 -20 L 1 -28" stroke="#3f9d4a" strokeWidth="3.2" strokeLinecap="round" />
    </g>
  );
}

export function Chili({ x, y, s = 1, r = 0, c = "#d92f2a" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-20 -4 C -6 -8 14 -4 22 10 C 10 4 -8 4 -20 4 Z" fill={c} />
      <path d="M-20 -4 L -26 -6 M -20 0 L -24 -2" stroke="#3f9d4a" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export function Herb({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M0 20 L 0 -18" stroke="#2f7d3a" strokeWidth="2.4" strokeLinecap="round" />
      <Leaf x={0} y={6} s={0.7} r={-40} />
      <Leaf x={0} y={-2} s={0.7} r={-140} c="#4caf55" />
      <Leaf x={0} y={-10} s={0.6} r={-50} c="#4caf55" />
      <Leaf x={0} y={-16} s={0.55} r={-130} />
    </g>
  );
}

export function Sack({ x, y, s = 1, r = 0, c = "#efe4cf", label = "#02a9ba" }: P & { c?: string; label?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-22 -22 C -14 -28 14 -28 22 -22 L 26 24 C 18 30 -18 30 -26 24 Z" fill={c} />
      <path d="M-22 -22 C -14 -18 14 -18 22 -22 C 14 -30 -14 -30 -22 -22 Z" fill="#d9ccb2" />
      <rect x="-14" y="-4" width="28" height="18" rx="4" fill={label} />
      <path d="M-8 5 h 16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

export function Jar({ x, y, s = 1, r = 0, fill = "#c8541b", lid = "#053b42" }: P & { fill?: string; lid?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <rect x="-14" y="-16" width="28" height="36" rx="7" fill="#fff" opacity=".9" />
      <rect x="-12" y="-6" width="24" height="24" rx="5" fill={fill} />
      <rect x="-15" y="-24" width="30" height="10" rx="3" fill={lid} />
      <rect x="-9" y="-12" width="4" height="18" rx="2" fill="#fff" opacity=".45" />
    </g>
  );
}

export function SpiceBowl({ x, y, s = 1, c = "#e4a11b" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s)}>
      <path d="M-18 0 C -18 14 18 14 18 0 Z" fill="#f4f1ea" />
      <ellipse cx="0" cy="0" rx="18" ry="5" fill={c} />
      <path d="M-10 -2 C -4 -8 6 -8 10 -2 Z" fill={c} />
    </g>
  );
}

export function Carton({ x, y, s = 1, r = 0, c = "#02a9ba" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-14 -16 L 0 -28 L 14 -16 Z" fill="#e8e3da" />
      <rect x="-14" y="-16" width="28" height="44" rx="2" fill="#fff" />
      <rect x="-14" y="0" width="28" height="16" fill={c} />
      <path d="M-14 -16 L 14 -16" stroke="#d9d2c4" strokeWidth="1.5" />
      <circle cx="0" cy="-7" r="4" fill={c} opacity=".5" />
    </g>
  );
}

export function Cheese({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-24 10 L 24 10 L 24 -6 L -24 -18 Z" fill="#f6c94a" />
      <path d="M-24 -18 L 24 -6 L 30 -12 L -16 -24 Z" fill="#fbdc7c" />
      <circle cx="-8" cy="0" r="3" fill="#e2ad2a" />
      <circle cx="10" cy="3" r="2.4" fill="#e2ad2a" />
    </g>
  );
}

export function Yoghurt({ x, y, s = 1, c = "#f47735" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s)}>
      <path d="M-14 -14 L 14 -14 L 11 16 L -11 16 Z" fill="#fff" />
      <rect x="-15" y="-18" width="30" height="5" rx="2" fill="#dcd6cb" />
      <path d="M-13 -4 L 13 -4 L 12 6 L -12 6 Z" fill={c} />
    </g>
  );
}

export function ChocBar({ x, y, s = 1, r = 0, wrap = "#7a2e8f" }: P & { wrap?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <rect x="-26" y="-12" width="52" height="24" rx="3" fill="#5b3420" />
      {[-18, -6, 6, 18].map((cx) => (
        <rect key={cx} x={cx - 5} y="-9" width="10" height="8" rx="1.5" fill="#6d4027" />
      ))}
      <rect x="-26" y="0" width="52" height="12" rx="2" fill={wrap} />
      <path d="M-18 6 h 20" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function Candy({ x, y, s = 1, r = 0, c = "#f47735" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M-10 0 L -20 -8 L -20 8 Z M 10 0 L 20 -8 L 20 8 Z" fill={c} opacity=".75" />
      <circle r="10" fill={c} />
      <path d="M-6 -4 C -2 -8 4 -6 6 -2" stroke="#fff" strokeOpacity=".6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

export function Lollipop({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <path d="M0 10 L 0 40" stroke="#f4f1ea" strokeWidth="3.4" strokeLinecap="round" />
      <circle r="14" fill="#02a9ba" />
      <path d="M0 0 m -10 0 a 10 10 0 1 1 10 10 a 6 6 0 1 1 -6 -6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

export function Biscuit({ x, y, s = 1 }: P) {
  return (
    <g transform={t(x, y, s)}>
      <circle r="13" fill="#d9a35c" />
      {[[-5, -4], [4, -5], [0, 4], [-6, 5], [6, 3]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.6" fill="#5b3420" />
      ))}
    </g>
  );
}

export function Newspaper({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <rect x="-30" y="-22" width="60" height="44" rx="3" fill="#fff" />
      <rect x="-24" y="-16" width="48" height="6" rx="1.5" fill="#1c1f22" />
      <rect x="-24" y="-6" width="22" height="18" rx="1.5" fill="#02a9ba" opacity=".85" />
      {[-5, 0, 5, 10].map((ly) => (
        <rect key={ly} x="2" y={ly - 1} width="22" height="2.4" rx="1" fill="#b9b2a6" />
      ))}
      <rect x="-24" y="15" width="48" height="2.4" rx="1" fill="#b9b2a6" />
    </g>
  );
}

export function Bottle({ x, y, s = 1, r = 0, c = "#02a9ba" }: P & { c?: string }) {
  return (
    <g transform={t(x, y, s, r)}>
      <rect x="-5" y="-34" width="10" height="8" rx="2" fill="#1c1f22" />
      <path d="M-5 -26 L 5 -26 L 5 -20 C 12 -16 12 -12 12 -8 L 12 26 C 12 29 10 30 8 30 L -8 30 C -10 30 -12 29 -12 26 L -12 -8 C -12 -12 -12 -16 -5 -20 Z" fill={c} opacity=".9" />
      <rect x="-12" y="0" width="24" height="12" fill="#fff" opacity=".9" />
      <rect x="-8" y="-12" width="3" height="34" rx="1.5" fill="#fff" opacity=".35" />
    </g>
  );
}

export function Phone({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <rect x="-16" y="-30" width="32" height="60" rx="7" fill="#1c1f22" />
      <rect x="-13" y="-24" width="26" height="46" rx="3" fill="#02a9ba" />
      <path d="M-6 -2 L 2 -12 L 0 -3 L 6 -3 L -2 8 L 0 -1 Z" fill="#fff" />
      <rect x="-5" y="-28" width="10" height="2" rx="1" fill="#4a5157" />
    </g>
  );
}

export function TopUpCard({ x, y, s = 1, r = 0 }: P) {
  return (
    <g transform={t(x, y, s, r)}>
      <rect x="-26" y="-16" width="52" height="32" rx="5" fill="#f47735" />
      <rect x="-20" y="-9" width="12" height="9" rx="2" fill="#fde2d1" />
      <path d="M-20 8 h 28" stroke="#1c1f22" strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="-4" r="6" fill="#fff" opacity=".4" />
    </g>
  );
}

export function Basket({ x, y, s = 1 }: P) {
  return (
    <g transform={t(x, y, s)}>
      <path d="M-40 -6 C -40 -38 40 -38 40 -6" stroke="#8a5a2b" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M-48 -6 L 48 -6 L 40 30 C 39 34 36 36 32 36 L -32 36 C -36 36 -39 34 -40 30 Z" fill="#c98b4a" />
      {[-30, -15, 0, 15, 30].map((bx) => (
        <path key={bx} d={`M${bx} -6 L ${bx * 0.85} 36`} stroke="#a86f34" strokeWidth="2" />
      ))}
      <path d="M-46 6 L 46 6 M -43 20 L 43 20" stroke="#a86f34" strokeWidth="2" />
      <rect x="-50" y="-10" width="100" height="8" rx="4" fill="#b07a3e" />
    </g>
  );
}
