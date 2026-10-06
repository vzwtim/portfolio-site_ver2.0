import styles from "@/app/refresh.module.css";

/** A short, reversible interlude driven by native scroll, without pinning. */
export default function ChapterTransition({ from, to, variant }: { from: string; to: string; variant: "shutters" | "iris" }) {
  return <div className={`${styles.chapterTransition} ${variant === "shutters" ? styles.transitionShutters : styles.transitionIris}`} data-chapter-transition={variant} aria-hidden="true">
    <div className={styles.transitionBackdrop}>
      {variant === "shutters" ? Array.from({ length: 8 }, (_, i) => <i key={i} style={{ "--strip-index": i } as React.CSSProperties} />) : <i className={styles.transitionDisc} />}
    </div>
    <div className={styles.transitionCopy}>
      <span className={styles.transitionIndex}>{from}<i />{to}</span>
      <p>{variant === "shutters" ? "線から、関係へ。" : "関係から、仕組みへ。"}</p>
      <span className={styles.transitionLabel}>{variant === "shutters" ? "CULTURE / PLANNING" : "DX / DIGITAL"}</span>
    </div>
    <span className={styles.transitionNumber}>{to}</span>
  </div>;
}
