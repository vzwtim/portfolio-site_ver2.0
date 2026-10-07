import styles from "@/app/refresh.module.css";

/** Decorative layers stay out of the reading and keyboard order. */
export function IngredientField() {
  return <div className={styles.ingredientField} aria-hidden="true" data-parallax="ingredients">
    <svg viewBox="0 0 700 800" fill="none">
      {[0, 1, 2, 3, 4].map((i) => <g key={i} className={styles.ingredient} style={{ "--ingredient": i } as React.CSSProperties}>
        <ellipse cx={320 + (i % 2) * 30} cy={375} rx={125 + i * 31} ry={240 - i * 19} transform={`rotate(${i * 37} 350 400)`} />
        <circle cx={320 + i * 38} cy={135 + i * 29} r={5 + i} />
      </g>)}
    </svg>
    <span className={styles.ingredientCaption}>FIVE INGREDIENTS.<br />ONE ONGOING EXPERIMENT.</span>
  </div>;
}

const drawingStages = [
  {
    "name": "walls",
    "start": 0,
    "paths": [
      "M180 150H790V530H180Z",
      "M188 158H782V522H188Z",
      "M480 158V240",
      "M480 315V522",
      "M188 330H300",
      "M370 330H560",
      "M630 330H782",
      "M310 338V415",
      "M310 480V522",
      "M650 338V522",
      "M480 410H650"
    ]
  },
  {
    "name": "windows",
    "start": 2.1,
    "paths": [
      "M180 195H188",
      "M180 285H188",
      "M188 195V285",
      "M184 195V285",
      "M790 185H782",
      "M790 290H782",
      "M786 185V290",
      "M782 185V290",
      "M215 150V158",
      "M420 150V158",
      "M215 154H420",
      "M215 158H420",
      "M530 530V522",
      "M740 530V522",
      "M530 526H740"
    ]
  },
  {
    "name": "doors",
    "start": 3.1,
    "paths": [
      "M480 245h70a70 70 0 0 1-70 70",
      "M560 330v70a70 70 0 0 0 70-70",
      "M310 415h65a65 65 0 0 1-65 65",
      "M300 330v70a70 70 0 0 0 70-70"
    ]
  },
  {
    "name": "living",
    "start": 4,
    "paths": [
      "M212 184H394V270H212Z",
      "M212 210H394",
      "M232 184V270",
      "M374 184V270",
      "M212 244H394",
      "M545 188H745V255H545Z",
      "M555 198H630V225H555Z",
      "M660 198H735V225H660Z",
      "M590 275H700V305H590Z"
    ]
  },
  {
    "name": "service",
    "start": 4.6,
    "paths": [
      "M680 355H757V496H680Z",
      "M690 365H747V390H690Z",
      "M690 465H747V486H690Z",
      "M690 400H747V455H690Z",
      "M495 435H630V502H495Z",
      "M505 445H620V492H505Z"
    ]
  },
  {
    "name": "stairs",
    "start": 5.2,
    "paths": [
      "M210 365H282V497H210Z",
      "M214 375H278",
      "M214 385H278",
      "M214 395H278",
      "M214 405H278",
      "M214 415H278",
      "M214 425H278",
      "M214 435H278",
      "M214 445H278",
      "M214 455H278",
      "M214 465H278",
      "M214 475H278",
      "M214 485H278",
      "M246 485V373l-5 8",
      "M246 373l5 8"
    ]
  },
  {
    "name": "bedroom",
    "start": 5.7,
    "paths": [
      "M350 365H435V490H350Z",
      "M355 375H430",
      "M355 480H430",
      "M360 392H425V460H360Z",
      "M360 405H425",
      "M365 392V460",
      "M420 392V460"
    ]
  },
  {
    "name": "fixtures",
    "start": 6.4,
    "paths": [
      "M510 167H770V180H510Z",
      "M565 167V180",
      "M620 167V180",
      "M675 167V180",
      "M730 167V180",
      "M520 170H550V178H520Z",
      "M524 172H546V176H524Z",
      "M536 168v5",
      "M690 171a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
      "M703 171a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
      "M690 177a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
      "M703 177a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
      "M753 168H768V178H753Z",
      "M758 171H764",
      "M687 412H706V440H687Z",
      "M690 415H703V428H690Z",
      "M690 430q-2 15 6 15q8 0 6-15Z",
      "M719 410H743V447H719Z",
      "M722 413H740V444H722Z",
      "M724 449h14",
      "M693 474a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
      "M449 349H465V405H449Z",
      "M457 349V405",
      "M449 368H465",
      "M449 387H465",
      "M334 365H345V384H334Z",
      "M439 365H450V384H439Z",
      "M337 387H347V413H337Z",
      "M438 387H448V413H438Z",
      "M597 265H618V273H597Z",
      "M648 265H669V273H648Z",
      "M597 307H618V315H597Z",
      "M648 307H669V315H648Z",
      "M214 278H247V295H214Z",
      "M359 278H392V295H359Z",
      "M200 342V512H299",
      "M287 352V510",
      "M289 356l-2-4l-2 4",
      "M205 163v13h13",
      "M764 163h13v13",
      "M205 505v9h9",
      "M768 505v9h-9"
    ]
  },
  {
    "name": "material",
    "start": 7.8,
    "paths": [
      "M188 150l8 8",
      "M197 150l8 8",
      "M206 150l8 8",
      "M215 150l8 8",
      "M224 150l8 8",
      "M233 150l8 8",
      "M242 150l8 8",
      "M251 150l8 8",
      "M260 150l8 8",
      "M269 150l8 8",
      "M278 150l8 8",
      "M287 150l8 8",
      "M296 150l8 8",
      "M305 150l8 8",
      "M314 150l8 8",
      "M323 150l8 8",
      "M332 150l8 8",
      "M341 150l8 8",
      "M350 150l8 8",
      "M359 150l8 8",
      "M368 150l8 8",
      "M377 150l8 8",
      "M386 150l8 8",
      "M395 150l8 8",
      "M404 150l8 8",
      "M413 150l8 8",
      "M422 150l8 8",
      "M431 150l8 8",
      "M440 150l8 8",
      "M449 150l8 8",
      "M458 150l8 8",
      "M467 150l8 8",
      "M476 150l8 8",
      "M485 150l8 8",
      "M494 150l8 8",
      "M503 150l8 8",
      "M512 150l8 8",
      "M521 150l8 8",
      "M530 150l8 8",
      "M539 150l8 8",
      "M548 150l8 8",
      "M557 150l8 8",
      "M566 150l8 8",
      "M575 150l8 8",
      "M584 150l8 8",
      "M593 150l8 8",
      "M602 150l8 8",
      "M611 150l8 8",
      "M620 150l8 8",
      "M629 150l8 8",
      "M638 150l8 8",
      "M647 150l8 8",
      "M656 150l8 8",
      "M665 150l8 8",
      "M674 150l8 8",
      "M683 150l8 8",
      "M692 150l8 8",
      "M701 150l8 8",
      "M710 150l8 8",
      "M719 150l8 8",
      "M728 150l8 8",
      "M737 150l8 8",
      "M746 150l8 8",
      "M755 150l8 8",
      "M764 150l8 8",
      "M180 167l8 8",
      "M180 176l8 8",
      "M180 185l8 8",
      "M180 194l8 8",
      "M180 203l8 8",
      "M180 212l8 8",
      "M180 221l8 8",
      "M180 230l8 8",
      "M180 239l8 8",
      "M180 248l8 8",
      "M180 257l8 8",
      "M180 266l8 8",
      "M180 275l8 8",
      "M180 284l8 8",
      "M180 293l8 8",
      "M180 302l8 8",
      "M180 311l8 8",
      "M180 320l8 8",
      "M180 329l8 8",
      "M180 338l8 8",
      "M180 347l8 8",
      "M180 356l8 8",
      "M180 365l8 8",
      "M180 374l8 8",
      "M180 383l8 8",
      "M180 392l8 8",
      "M180 401l8 8",
      "M180 410l8 8",
      "M180 419l8 8",
      "M180 428l8 8",
      "M180 437l8 8",
      "M180 446l8 8",
      "M180 455l8 8",
      "M180 464l8 8",
      "M180 473l8 8",
      "M180 482l8 8",
      "M180 491l8 8",
      "M180 500l8 8",
      "M180 509l8 8",
      "M180 518l8 8",
      "M720 355h27",
      "M720 367h27",
      "M720 379h27",
      "M720 391h27",
      "M720 403h27",
      "M720 415h27",
      "M720 427h27",
      "M720 439h27",
      "M720 451h27",
      "M720 463h27",
      "M720 475h27",
      "M720 487h27",
      "M197 168V319",
      "M215 168V319",
      "M233 168V319",
      "M251 168V319",
      "M269 168V319",
      "M287 168V319",
      "M305 168V319",
      "M323 168V319",
      "M341 168V319",
      "M359 168V319",
      "M377 168V319",
      "M395 168V319",
      "M413 168V319",
      "M431 168V319",
      "M449 168V319",
      "M467 168V319"
    ]
  },
  {
    "name": "dimension",
    "start": 9,
    "paths": [
      "M180 112H480",
      "M480 112H790",
      "M180 103V138",
      "M480 103V138",
      "M790 103V138",
      "M180 110l-3 4",
      "M480 110l-3 4",
      "M790 110l-3 4",
      "M812 150V330",
      "M812 330V530",
      "M802 150H827",
      "M802 330H827",
      "M802 530H827",
      "M310 552H480",
      "M480 552H650",
      "M650 552H790",
      "M310 538V559",
      "M480 538V559",
      "M650 538V559",
      "M790 538V559"
    ]
  }
];

// Preserve every detail while animating each drafting stage as a single path.
const detailStages = [
  { name: "joinery", start: 6.8, paths: [
    ...Array.from({ length: 17 }, (_, i) => `M${220+i*12} 150v8M${220+i*12} 154h6`),
    ...Array.from({ length: 17 }, (_, i) => `M${536+i*12} 522v8M${536+i*12} 526h6`),
    ...Array.from({ length: 13 }, (_, i) => `M451 ${353+i*4}h12`),
    ...[218,260,302,344].map(x => `M${x} 189h38v16h-38Z`),
    "M216 215h72v25h-72Z", "M294 215h72v25h-72Z",
    "M362 370h27v18h-27Z", "M395 370h27v18h-27Z",
    "M594 280h46v20h-46Z", "M646 280h46v20h-46Z",
    "M497 417h130v12H497Z", "M521 417v12", "M550 417v12", "M579 417v12", "M608 417v12",
  ] },
  { name: "floor-joints", start: 8.8, paths: [
    ...Array.from({ length: 16 }, (_, row) => Array.from({ length: 5 }, (_, col) =>
      `M${198+col*54+(row%2)*27} ${174+row*9}v9`)).flat(),
    ...Array.from({ length: 15 }, (_, i) => `M490 ${190+i*9}H770`),
    ...Array.from({ length: 40 }, (_, i) => { const x=492+(i%8)*34; const y=190+Math.floor(i/8)*27; return `M${x} ${y}v9`; }),
    ...Array.from({ length: 12 }, (_, i) => `M320 ${352+i*14}H470`),
    ...Array.from({ length: 10 }, (_, i) => `M${327+i*14} 342V512`),
    ...Array.from({ length: 10 }, (_, i) => `M660 ${351+i*16}H772`),
    ...Array.from({ length: 7 }, (_, i) => `M${664+i*16} 342V513`),
  ] },
  { name: "lighting", start: 10.8, paths: [
    ...[[445,238],[515,285],[394,348],[568,380],[716,343],[271,351]].flatMap(([x,y]) => [
      `M${x-4} ${y}a4 4 0 1 0 8 0a4 4 0 1 0-8 0`,
      `M${x-3} ${y-3}l6 6M${x+3} ${y-3}l-6 6`,
      `M${x-7} ${y}h3M${x+4} ${y}h3`,
    ]),
    ...[[202,300],[468,190],[496,322],[640,393],[323,493],[757,346]].map(([x,y]) => `M${x} ${y}v8h5v-8Z`),
    "M445 238Q440 300 468 319", "M515 285Q515 309 550 322", "M394 348Q325 345 323 405",
    "M568 380Q615 375 640 393", "M716 343Q746 343 757 346",
  ] },
  { name: "terrace", start: 11.8, paths: [
    "M189 540V581H783V540", "M198 541V572H774V541", "M198 566H774",
    ...Array.from({ length: 32 }, (_, i) => `M${204+i*18} 544v22`),
    ...Array.from({ length: 20 }, (_, i) => `M${200+i*30} 572v9`),
    "M234 545h62v15h-62Z", "M669 545h62v15h-62Z",
    ...[248,270,682,706].map(x => `M${x-5} 552a5 5 0 1 0 10 0a5 5 0 1 0-10 0`),
  ] },
];
const allDrawingStages = [...drawingStages, ...detailStages];

export function BlueprintField() {
  return <div className={styles.blueprintField} aria-hidden="true" data-drawing>
    <div className={styles.rulerTop}>{Array.from({ length: 21 }, (_, i) => <span key={i}>{String(i * 5).padStart(3, "0")}</span>)}</div>
    <div className={styles.rulerSide}>{Array.from({ length: 12 }, (_, i) => <span key={i}>{String(i * 10).padStart(3, "0")}</span>)}</div>
    <svg className={styles.blueprint} viewBox="0 0 1000 700" fill="none" data-parallax="plan">
      {allDrawingStages.map(stage => <g key={stage.name} className={`${styles.draftingLayer} ${stage.name === "material" ? styles.materialLayer : ""}`} data-drafting-layer={stage.name}>
        <path d={stage.paths.join(" ")} pathLength="1" className={styles.draftStroke} style={{ "--draw-delay": `${stage.start}s`, "--draw-duration": stage.name === "walls" ? "2.1s" : "1.8s" } as React.CSSProperties} />
      </g>)}
      <g className={styles.planAnnotations}>
        <path d="M160 140H810M160 340H810M160 540H810M170 125V560M470 125V560M800 125V560" />
        {[[170,140,'A'],[470,140,'B'],[800,140,'C'],[170,340,'02'],[170,540,'03']].map(([x,y,label]) => <g key={label}><circle cx={x} cy={y} r="10" /><text x={x} y={Number(y)+3} textAnchor="middle">{label}</text></g>)}
        <text x="235" y="306">LIVING / 24.6㎡</text><text x="560" y="294">WORK / 18.2㎡</text>
        <text x="342" y="510">BEDROOM</text><text x="697" y="510">SERVICE</text>
        <text x="315" y="107">6,300</text><text x="610" y="107">6,500</text>
        <text x="348" y="567">3,570</text><text x="535" y="567">3,570</text><text x="695" y="567">2,940</text>
      </g>
      <g className={styles.dimensionLines}>
        <path d="M180 95H790M180 80V135M790 80V135M165 110l30-30M775 110l30-30M840 150V530M815 150h40M815 530h40M825 165l30-30M825 545l30-30M145 150H870M145 530H870" />
        <text x="450" y="82">12,800</text><text x="855" y="350" transform="rotate(90 855 350)">8,400</text>
        <text x="205" y="595">PLAN / 01 · DETAIL STUDY</text><text x="650" y="595">SCALE 1 : 100</text>
        <path d="M215 615H365M215 610V620M245 610V620M275 610V620M305 610V620M335 610V620M365 610V620" />
        <text x="215" y="637">0</text><text x="278" y="637">2</text><text x="358" y="637">5m</text>
      </g>
      <g className={styles.planCrosshair}><path d="M500 0V700M0 350H1000" /><circle cx="500" cy="350" r="24" /></g>
    </svg>
    <span className={styles.drawingStamp}>FIELD NOTES / DETAIL STUDY<br />OBSERVE → MEASURE → BUILD</span>
  </div>;
}

// An illustrative metro network: routes stay continuous and trains follow their geometry.
const metroRoutes = [
  { color: "#f5a64a", path: "M-100 140H280Q320 140 350 170L580 400Q610 430 650 430H1540", stops: [[120,140],[280,140],[460,280],[650,430],[920,430],[1250,430]] },
  { color: "#55d1ba", path: "M-100 640H280Q320 640 350 610L800 160Q830 130 870 130H1540", stops: [[100,640],[280,640],[500,460],[650,310],[870,130],[1160,130]] },
  { color: "#9ca7ff", path: "M180 -80V210Q180 250 220 250H1030Q1070 250 1070 290V900", stops: [[180,100],[180,210],[430,250],[760,250],[1030,250],[1070,580]] },
  { color: "#ee7899", path: "M-100 790H720Q760 790 760 750V540Q760 500 800 500H1160Q1200 500 1200 460V-80", stops: [[180,790],[510,790],[760,660],[800,500],[1160,500],[1200,180]] },
];
export function DigitalField() {
  return <div className={styles.digitalField} aria-hidden="true">
    <svg className={styles.metroNetwork} viewBox="0 0 1440 820" fill="none" preserveAspectRatio="xMidYMid slice">
      {metroRoutes.map((route, i) => <g key={route.color} style={{ color: route.color }}>
        <path className={styles.metroRoute} d={route.path} />
        {route.stops.map(([x,y]) => <g key={`${x}-${y}`} className={styles.metroStation}><circle cx={x} cy={y} r="6" /><circle cx={x} cy={y} r="2" /></g>)}
        {[0, 1].map(train => <g key={train} className={styles.metroTrain} style={{ offsetPath: `path("${route.path}")`, animationDuration: `${18 + i * 4}s`, animationDelay: `${-train * (18 + i * 4) / 2 - i * 3}s` }}>
          <rect x="-20" y="-4" width="40" height="8" rx="4" />
          <path d="M-10 -3V3M0 -3V3M10 -3V3" />
        </g>)}
      </g>)}
    </svg>
    <span className={styles.metroLegend}>METRO / CONNECTIONS IN MOTION</span>
  </div>;
}
