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

export function BlueprintField() {
  return <div className={styles.blueprintField} aria-hidden="true">
    <div className={styles.rulerTop}>{Array.from({ length: 21 }, (_, i) => <span key={i}>{String(i * 5).padStart(3, "0")}</span>)}</div>
    <div className={styles.rulerSide}>{Array.from({ length: 12 }, (_, i) => <span key={i}>{String(i * 10).padStart(3, "0")}</span>)}</div>
    <svg className={styles.blueprint} viewBox="0 0 1000 700" fill="none" data-parallax="plan">
      <g className={styles.planLines}>
        <path pathLength="1" d="M180 150H790V530H180ZM188 158H782V522H188ZM480 158V240M480 315V522M188 330H300M370 330H560M630 330H782M310 338V415M310 480V522M650 338V522M480 410H650" />
        <path pathLength="1" d="M180 195H188M180 285H188M188 195V285M184 195V285M790 185H782M790 290H782M786 185V290M782 185V290M215 150V158M420 150V158M215 154H420M215 158H420M530 530V522M740 530V522M530 526H740" />
        <path pathLength="1" d="M480 245h70a70 70 0 0 1-70 70M560 330v70a70 70 0 0 0 70-70M310 415h65a65 65 0 0 1-65 65M300 330v70a70 70 0 0 0 70-70" />
        <path pathLength="1" d="M212 184H394V270H212ZM212 210H394M232 184V270M374 184V270M212 244H394M545 188H745V255H545ZM555 198H630V225H555ZM660 198H735V225H660ZM590 275H700V305H590Z" />
        <path pathLength="1" d="M680 355H757V496H680ZM690 365H747V390H690ZM690 465H747V486H690ZM690 400H747V455H690ZM495 435H630V502H495ZM505 445H620V492H505Z" />
        <path pathLength="1" d="M210 365H282V497H210ZM214 375H278M214 385H278M214 395H278M214 405H278M214 415H278M214 425H278M214 435H278M214 445H278M214 455H278M214 465H278M214 475H278M214 485H278M246 485V373l-5 8M246 373l5 8" />
        <path pathLength="1" d="M350 365H435V490H350ZM355 375H430M355 480H430M360 392H425V460H360ZM360 405H425M365 392V460M420 392V460" />
      </g>
      <g className={styles.planAnnotations}>
        <path d="M160 140H810M160 340H810M160 540H810M170 125V560M470 125V560M800 125V560" />
        {[[170,140,'A'],[470,140,'B'],[800,140,'C'],[170,340,'02'],[170,540,'03']].map(([x,y,label]) => <g key={label}><circle cx={x} cy={y} r="10" /><text x={x} y={Number(y)+3} textAnchor="middle">{label}</text></g>)}
        <text x="235" y="306">LIVING / 24.6㎡</text><text x="560" y="294">WORK / 18.2㎡</text>
        <text x="342" y="510">BEDROOM</text><text x="697" y="510">SERVICE</text>
      </g>
      <g className={styles.dimensionLines}>
        <path d="M180 95H790M180 80V135M790 80V135M165 110l30-30M775 110l30-30M840 150V530M815 150h40M815 530h40M825 165l30-30M825 545l30-30M145 150H870M145 530H870" />
        <text x="450" y="82">12,800</text><text x="855" y="350" transform="rotate(90 855 350)">8,400</text>
        <text x="205" y="575">PLAN / 01</text><text x="650" y="575">SCALE 1 : 100</text>
      </g>
      <g className={styles.planCrosshair}><path d="M500 0V700M0 350H1000" /><circle cx="500" cy="350" r="24" /></g>
    </svg>
    <span className={styles.drawingStamp}>FIELD NOTES / DRAWING IN PROGRESS<br />OBSERVE → MEASURE → BUILD</span>
  </div>;
}

const code = [
  "const insight = observe(context);", "const map = data.map(connect);", "if (friction) prototype(idea);",
  "await team.learnTogether();", "iterate({ people, process });", "return makeItUseful(insight);",
  "// small tools, real change", "system.connect(people, ideas);",
];
export function DigitalField() {
  return <div className={styles.digitalField} aria-hidden="true">
    <div className={styles.codeWindow}><span className={styles.codeLabel}>LIVE / EXPERIMENTS.TS</span>
      <div className={styles.codeViewport}><div className={styles.codeStream}>{[0, 1].map(copy => <div key={copy}>{code.map((line, i) => <div className={styles.codeLine} key={line}><span>{String(i + 1).padStart(2, "0")}</span>{line}</div>)}</div>)}</div></div>
    </div>
    {[
      "M0 190H80V80H210V150H320V30H420M40 250V210H170V30H290",
      "M0 30H100V150H220V80H360V210H420M60 250V190H160V20H310",
      "M0 160H120V40H240V190H340V90H420M80 250V220H200V110H300",
    ].map((path, i) => <svg key={path} className={`${styles.dataCircuit} ${styles[`circuit${i + 1}`]}`} viewBox="0 0 420 250" fill="none">
      <path d={path} /><path className={styles.dataPacket} d={path} style={{ animationDelay: `${-i * 2.5}s` }} />
      {[[80,80],[210,150],[320,30]].map(([x,y]) => <g key={x}><circle cx={x} cy={y} r="3.5" /><circle cx={x} cy={y} r="8" className={styles.circuitNode} /></g>)}
    </svg>)}
  </div>;
}
