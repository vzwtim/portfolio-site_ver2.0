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
        <path pathLength="1" d="M180 150H790V530H180ZM194 164H776V516H194ZM480 164V330H776M480 330H194M480 410V516M650 330V516M310 330V516" />
        <path pathLength="1" d="M480 245h70a70 70 0 0 1-70 70M570 330v70a70 70 0 0 0 70-70M310 425h60a60 60 0 0 1-60 60" />
        <path pathLength="1" d="M210 195H405V290H210ZM680 365H750V485H680M220 370H280V490H220Z" />
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
    <svg className={styles.dataCircuit} viewBox="0 0 800 500" fill="none"><path d="M0 360H180V160H430V280H620V80H800M100 500V420H350V60H720" /><path className={styles.dataPacket} d="M0 360H180V160H430V280H620V80H800" />{[[180,160],[430,280],[620,80],[350,420]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="7" />)}</svg>
  </div>;
}
