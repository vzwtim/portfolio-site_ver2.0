"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { RADAR_LABEL_SHORT, skillsByStage, type SkillCategory, type StageSkillData } from "@/data/skills";
import styles from "./SkillsChart.module.css";

type Bubble = SkillCategory & { x: number; y: number; radius: number };

const shortLabels: Record<string, string> = {
  communication: "伝達",
  programming: "コード",
  marketing: "販促",
  pm: "進行",
  research: "調査",
};

function packBubbles(categories: SkillCategory[], width: number) {
  const scale = Math.min(1.12, Math.max(0.68, width / 490));
  // Keep room for the floating animation and keyboard focus ring between circles.
  const gap = width < 400 ? 13 : 17;
  const edge = 9;
  const bubbles: Bubble[] = [];
  let bottom = 0;

  for (const category of [...categories].sort((a, b) => b.current - a.current)) {
    const radius = Math.round((39 + category.current * 7.8) * scale / 2);
    const min = radius + edge;
    let point = { x: width / 2, y: bottom + radius + gap + edge };
    let best = Infinity;

    for (let y = min; y <= bottom + radius + gap + edge; y += 5) {
      if (y > best) break;
      for (let x = min; x <= width - min; x += 5) {
        const score = y + Math.abs(x - width / 2) * 0.30;
        if (score >= best) continue;
        const clear = bubbles.every((bubble) =>
          Math.hypot(x - bubble.x, y - bubble.y) >= radius + bubble.radius + gap
        );
        if (clear) {
          point = { x, y };
          best = score;
        }
      }
    }

    bubbles.push({ ...category, ...point, radius });
    bottom = Math.max(bottom, point.y + radius);
  }

  return { bubbles, height: bottom + edge };
}

export default function SkillsChart({ stageData }: { stageData: StageSkillData }) {
  const field = useRef<HTMLDivElement>(null);
  const detail = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [selectedKey, setSelectedKey] = useState("architecture");
  const [paused, setPaused] = useState(false);
  const detailId = useId();
  const selected = stageData.categories.find((category) => category.key === selectedKey);
  const future = skillsByStage.future.categories.find((category) => category.key === selectedKey);
  const isFuture = stageData === skillsByStage.future;
  const tools = stageData.tools.filter((tool) => tool.cat === selected?.label);
  const packed = useMemo(() => width ? packBubbles(stageData.categories, width) : null, [stageData, width]);

  function selectBubble(key: string) {
    setSelectedKey(key);
    if (window.matchMedia("(max-width: 700px)").matches) {
      detail.current?.focus({ preventScroll: true });
      detail.current?.scrollIntoView({ block: "nearest" });
    }
  }

  useEffect(() => {
    const element = field.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <p>丸の大きさが習熟度。気になるスキルを選ぶと詳細が見られます。</p>
        <button type="button" className={styles.motionToggle} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          アニメーションを停止
        </button>
      </div>
      <div className={styles.layout}>
        <div
          ref={field}
          className={styles.field}
          data-paused={paused}
          role="group"
          aria-label="スキルを選ぶ"
          style={packed ? { height: packed.height } : undefined}
        >
          {packed?.bubbles.map((bubble, index) => (
            <button
              key={bubble.key}
              type="button"
              aria-label={`${bubble.label}、${bubble.current} / 10`}
              aria-pressed={bubble.key === selectedKey}
              aria-controls={detailId}
              className={styles.bubble}
              data-tone={bubble.current >= 7 ? "strong" : bubble.current >= 4 ? "mid" : "soft"}
              style={{
                width: bubble.radius * 2,
                height: bubble.radius * 2,
                left: bubble.x - bubble.radius,
                top: bubble.y - bubble.radius,
                "--delay": `${-(index % 7)}s`,
                "--duration": `${6 + (index % 4)}s`,
                "--drift": `${index % 2 ? 4 : -4}px`,
              } as CSSProperties}
              onClick={() => selectBubble(bubble.key)}
            >
              <span>{shortLabels[bubble.key] ?? RADAR_LABEL_SHORT[bubble.label] ?? bubble.label}</span>
            </button>
          ))}
        </div>
        {selected && (
          <div ref={detail} id={detailId} tabIndex={-1} className={styles.detail} role="region" aria-label="スキルの詳細">
            <div aria-live="polite" aria-atomic="true">
              <h3>{selected.label}</h3>
              <p className={styles.score}>
                <strong>{selected.current}</strong><span> / 10</span>
                {!isFuture && future && <span className={styles.goal}>目標 {future.current} / 10</span>}
              </p>
              {tools.length > 0 && (
                <ul className={styles.tools} aria-label="関連するスキルと習熟度">
                  {tools.map((tool) => (
                    <li key={tool.label}>
                      <div>{tool.label}{tool.note && <small>{tool.note}</small>}</div>
                      <span>{tool.level} / 5</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              className={styles.back}
              onClick={() => field.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus()}
            >
              丸に戻る ↑
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
