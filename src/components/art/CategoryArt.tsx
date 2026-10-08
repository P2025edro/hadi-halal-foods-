import type { ReactNode } from "react";
import type { ArtKey } from "@/config/categories";
import {
  Apple, Aubergine, Avocado, Banana, Biscuit, Bottle, Broccoli, Candy, Carrot, Carton, Cheese,
  Chili, ChocBar, Grapes, Herb, Jar, Lemon, Lollipop, Newspaper, Orange, Pepper, Phone, Sack,
  Shadow, SpiceBowl, Tomato, TopUpCard, Yoghurt,
} from "./shapes";

function Pot({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="-14" rx="34" ry="8" fill="#032a2f" />
      <ellipse cx="0" cy="-15" rx="30" ry="6" fill="#c8541b" />
      <circle cx="-10" cy="-16" r="4" fill="#e8a33a" />
      <circle cx="8" cy="-15" r="3" fill="#3f9d4a" />
      <circle cx="16" cy="-17" r="2.4" fill="#e2412f" />
      <path d="M-34 -14 L -30 18 C -29 24 -24 26 -18 26 L 18 26 C 24 26 29 24 30 18 L 34 -14 Z" fill="#053b42" />
      <rect x="-46" y="-12" width="14" height="6" rx="3" fill="#053b42" />
      <rect x="32" y="-12" width="14" height="6" rx="3" fill="#053b42" />
      <path d="M-24 -4 L -22 16" stroke="#fff" strokeOpacity=".2" strokeWidth="4" strokeLinecap="round" />
      <path d="M-8 -30 c -4 -6 4 -8 0 -14 M 8 -30 c -4 -6 4 -8 0 -14" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

const scenes: Record<ArtKey, ReactNode> = {
  fruit: (
    <>
      <Shadow x={100} y={128} w={150} o={0.1} />
      <Banana x={96} y={86} s={1.25} r={-8} />
      <Grapes x={146} y={92} s={1.05} />
      <Apple x={62} y={108} s={1.05} />
      <Orange x={104} y={110} s={1.05} />
      <Lemon x={146} y={118} s={0.85} r={10} />
      <Apple x={38} y={116} s={0.8} c="#8cbf3f" />
    </>
  ),
  vegetables: (
    <>
      <Shadow x={100} y={130} w={150} o={0.1} />
      <Broccoli x={70} y={88} s={1.25} />
      <Carrot x={132} y={84} s={1.1} r={25} />
      <Aubergine x={150} y={104} s={0.95} r={30} />
      <Tomato x={96} y={114} s={1} />
      <Pepper x={52} y={114} s={0.9} c="#f2b51e" />
      <Tomato x={124} y={120} s={0.7} />
    </>
  ),
  halal: (
    <>
      <Shadow x={100} y={132} w={150} o={0.1} />
      <Herb x={40} y={98} s={1.2} />
      <Pot x={100} y={104} />
      <Chili x={152} y={122} s={0.9} r={-10} />
      <SpiceBowl x={156} y={102} s={0.9} c="#c8541b" />
      <Lemon x={56} y={124} s={0.7} r={-10} />
    </>
  ),
  asian: (
    <>
      <Shadow x={100} y={132} w={150} o={0.1} />
      <Sack x={64} y={96} s={1.15} />
      <Jar x={120} y={98} s={1} fill="#c8541b" />
      <Jar x={150} y={108} s={0.8} fill="#e4a11b" lid="#f47735" />
      <SpiceBowl x={104} y={124} s={1} c="#e4a11b" />
      <SpiceBowl x={146} y={128} s={0.8} c="#c8541b" />
      <Chili x={40} y={126} s={0.8} r={-12} />
    </>
  ),
  dairy: (
    <>
      <Shadow x={100} y={130} w={150} o={0.1} />
      <Carton x={70} y={90} s={1.2} />
      <Bottle x={106} y={92} s={1.05} c="#e8f8fa" />
      <Cheese x={148} y={112} s={1} />
      <Yoghurt x={124} y={116} s={0.9} />
      <Yoghurt x={42} y={118} s={0.8} c="#02a9ba" />
    </>
  ),
  confectionery: (
    <>
      <Shadow x={100} y={130} w={150} o={0.1} />
      <Lollipop x={60} y={70} s={1.1} r={-12} />
      <ChocBar x={110} y={92} s={1.1} r={-10} />
      <ChocBar x={124} y={112} s={0.9} r={6} wrap="#f47735" />
      <Candy x={150} y={84} s={0.9} c="#02a9ba" r={20} />
      <Candy x={76} y={118} s={0.9} />
      <Biscuit x={44} y={120} s={0.95} />
      <Biscuit x={162} y={120} s={0.8} />
    </>
  ),
  newspapers: (
    <>
      <Shadow x={100} y={130} w={150} o={0.1} />
      <Newspaper x={86} y={92} s={1.3} r={-6} />
      <Bottle x={150} y={98} s={0.95} c="#3f9d4a" />
      <Carton x={128} y={110} s={0.75} c="#f47735" />
      <Sack x={48} y={116} s={0.6} c="#fff" label="#f47735" />
    </>
  ),
  topups: (
    <>
      <Shadow x={100} y={130} w={150} o={0.1} />
      <Phone x={82} y={92} s={1.2} r={-8} />
      <TopUpCard x={136} y={104} s={1} r={8} />
      <Bottle x={160} y={96} s={0.75} c="#e2412f" />
      <Candy x={54} y={120} s={0.8} c="#02a9ba" />
      <ChocBar x={130} y={126} s={0.6} r={-4} />
    </>
  ),
};

export function CategoryArt({ art, className }: { art: ArtKey; className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} role="img" aria-hidden="true" focusable="false">
      {scenes[art]}
    </svg>
  );
}

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 480" className={className} aria-hidden="true" focusable="false">
      {/* backdrop */}
      <circle cx="270" cy="236" r="200" fill="#02a9ba" opacity=".22" />
      <circle cx="270" cy="236" r="150" fill="#02a9ba" opacity=".18" />
      <circle cx="270" cy="236" r="214" fill="none" stroke="#f47735" strokeWidth="2" strokeDasharray="4 12" opacity=".7" />
      {/* bowl */}
      <ellipse cx="262" cy="404" rx="200" ry="22" fill="#000" opacity=".25" />
      <g>
        {/* back row */}
        <Broccoli x={176} y={222} s={2.5} />
        <Banana x={300} y={204} s={2.4} r={-14} />
        <Carrot x={404} y={236} s={2.1} r={32} />
        <Herb x={110} y={276} s={2.1} />
        {/* middle row */}
        <Grapes x={392} y={290} s={1.9} />
        <Pepper x={128} y={326} s={1.9} c="#f2b51e" />
        <Aubergine x={212} y={300} s={1.6} r={-30} />
        <Avocado x={326} y={318} s={1.7} r={14} />
        {/* front row */}
        <Orange x={196} y={354} s={1.9} />
        <Tomato x={276} y={366} s={1.7} />
        <Apple x={352} y={366} s={1.6} />
        <Lemon x={426} y={364} s={1.4} r={-12} />
        <Apple x={114} y={378} s={1.3} c="#8cbf3f" />
        <Chili x={248} y={402} s={1.3} r={-6} />
      </g>
      {/* sparkles */}
      <path d="M78 120 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 Z" fill="#f47735" />
      <path d="M454 132 l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z" fill="#fff" opacity=".8" />
      <circle cx="470" cy="420" r="5" fill="#f47735" />
    </svg>
  );
}

export function EditorialArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 420" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true" focusable="false">
      <rect width="520" height="420" fill="#f2ece2" />
      <circle cx="400" cy="90" r="120" fill="#02a9ba" opacity=".14" />
      <circle cx="90" cy="360" r="110" fill="#f47735" opacity=".12" />
      {/* shelf */}
      <rect x="40" y="170" width="440" height="12" rx="6" fill="#c98b4a" />
      <rect x="40" y="320" width="440" height="12" rx="6" fill="#c98b4a" />
      {/* top shelf: pantry */}
      <Sack x={96} y={132} s={1.4} />
      <Jar x={170} y={140} s={1.3} fill="#c8541b" />
      <Jar x={222} y={140} s={1.3} fill="#e4a11b" lid="#f47735" />
      <Bottle x={276} y={130} s={1.2} c="#3f9d4a" />
      <Carton x={326} y={130} s={1.15} />
      <Sack x={404} y={132} s={1.4} c="#fff" label="#f47735" />
      {/* bottom shelf: produce */}
      <Broccoli x={96} y={278} s={1.5} />
      <Orange x={168} y={298} s={1.2} />
      <Orange x={206} y={302} s={1.05} />
      <Tomato x={256} y={302} s={1.15} />
      <Pepper x={306} y={296} s={1.1} c="#e7392a" />
      <Apple x={354} y={300} s={1.1} />
      <Lemon x={410} y={306} s={1} />
      <Grapes x={448} y={290} s={1} />
      {/* basket */}
      <g transform="translate(260 388)">
        <ellipse cx="0" cy="22" rx="70" ry="8" fill="#000" opacity=".12" />
      </g>
    </svg>
  );
}
