"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { RADAR_LABEL_SHORT, type StageSkillData } from "@/data/skills";
import styles from "./SkillsChart.module.css";

const shortLabels: Record<string, string> = {
  communication: "伝える力",
  programming: "コード",
  marketing: "マーケ",
  pm: "進行管理",
  research: "調査・分析",
};

type BubbleBody = {
  element: HTMLButtonElement;
  x: number;
  y: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

type Grab = {
  body: BubbleBody;
  pointer: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  time: number;
  moved: boolean;
  vx: number;
  vy: number;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const widePositions = [
  [.15, .20], [.27, .32], [.42, .12], [.59, .24], [.83, .15],
  [.08, .48], [.37, .45], [.48, .52], [.72, .40], [.88, .47],
  [.24, .63], [.14, .79], [.59, .65], [.76, .72], [.91, .83],
  [.38, .77], [.50, .87], [.70, .92],
];

function place(body: BubbleBody) {
  body.element.style.transform = `translate3d(${body.x.toFixed(2)}px,${body.y.toFixed(2)}px,0)`;
}

export default function SkillsChart({ stageData }: { stageData: StageSkillData }) {
  const field = useRef<HTMLDivElement>(null);
  const bodies = useRef(new Map<string, BubbleBody>());
  const size = useRef({ width: 0, height: 0 });
  const grab = useRef<Grab | null>(null);
  const suppressClick = useRef<number | null>(null);
  const paused = useRef(false);
  const focused = useRef<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [motionPaused, setMotionPaused] = useState(false);
  const [split, setSplit] = useState<{ key: string; merging: boolean } | null>(null);
  const splitKey = useRef<string | null>(null);
  const instructionsId = useId();

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  useEffect(() => {
    const element = field.current;
    if (!element) return;

    const buttons = Array.from(element.querySelectorAll<HTMLButtonElement>("[data-bubble]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let visible = false;

    function measure() {
      const width = element!.clientWidth;
      const height = element!.clientHeight;
      if (!width || !height) return;
      const previous = size.current;
      size.current = { width, height };
      const columns = width < 480 ? 3 : width < 760 ? 4 : 5;
      const rows = Math.ceil(buttons.length / columns);
      buttons.forEach((button, index) => {
        const key = button.dataset.bubble!;
        const level = Number(button.dataset.level);
        const radius = Math.round((24 + 4.55 * level) * (width < 480 ? 0.93 : 1.18));
        const [ratioX, ratioY] = (columns === 5 && widePositions[index]) || [
          ((index % columns) + 0.52) / columns + Math.sin(index * 2.37) * 0.085,
          (Math.floor(index / columns) + 0.52) / rows + Math.cos(index * 2.21) * 0.055,
        ];
        const body = bodies.current.get(key) ?? {
          element: button,
          x: clamp(ratioX * width, radius, width - radius),
          y: ratioY * height,
          homeY: 0,
          vx: 0,
          vy: 0,
          radius,
          phase: index * 2.4,
        };
        if (body.homeY && previous.width && previous.height) {
          body.x *= width / previous.width;
          body.y *= height / previous.height;
          body.homeY *= height / previous.height;
        }
        body.radius = radius;
        body.y = clamp(body.y, radius + 4, height - radius - 4);
        if (!body.homeY) body.homeY = body.y;
        button.style.setProperty("--diameter", `${radius * 2}px`);
        bodies.current.set(key, body);
        place(body);
      });
      element!.dataset.ready = "true";
    }

    function tick(time: number) {
      if (!visible) return;
      frame = requestAnimationFrame(tick);
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.033) : 0;
      lastTime = time;
      if (paused.current || reducedMotion.matches || document.hidden) return;
      const { width, height } = size.current;

      const nodes = [...bodies.current];
      const anchored = (key: string, body: BubbleBody) =>
        grab.current?.body === body || splitKey.current === key || focused.current === key;

      // Let rims overlap, but nudge nearby bubbles apart before their labels collide.
      for (let i = 0; i < nodes.length; i++) {
        const [aKey, a] = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const [bKey, b] = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);
          const overlap = (a.radius + b.radius) * 0.7 - distance;
          if (overlap <= 0 || distance < 0.1) continue;
          const force = overlap * dt * 2.5 / distance;
          if (!anchored(aKey, a)) {
            a.vx -= dx * force;
            a.vy -= dy * force;
          }
          if (!anchored(bKey, b)) {
            b.vx += dx * force;
            b.vy += dy * force;
          }
        }
      }

      for (const [key, body] of nodes) {
        if (anchored(key, body)) continue;
        // A steady current carries the bubbles while drag velocity decays into it.
        const drift = 10 + 5 * Math.sin(body.phase + time / 3900);
        body.vx *= Math.exp(-2.2 * dt);
        body.vy *= Math.exp(-3 * dt);
        body.x += (drift + body.vx) * dt;
        const surface = body.homeY + 21 * Math.sin(time / 1800 + body.phase);
        body.y += ((surface - body.y) * 1.8 + body.vy) * dt;
        body.y = clamp(body.y, body.radius + 4, height - body.radius - 4);
        const edge = body.radius + 12;
        if (body.x > width + edge) body.x = -edge;
        if (body.x < -edge) body.x = width + edge;
        place(body);
      }
    }

    const resize = new ResizeObserver(measure);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (visible) frame = requestAnimationFrame(tick);
    });
    measure();
    resize.observe(element);
    intersection.observe(element);
    return () => {
      resize.disconnect();
      intersection.disconnect();
      cancelAnimationFrame(frame);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const height = size.current.height;
    for (const category of stageData.categories) {
      const body = bodies.current.get(category.key);
      if (!body || !height) continue;
      body.radius = Math.round((24 + 4.55 * category.current) * (size.current.width < 480 ? 0.93 : 1.18));
      body.element.style.setProperty("--diameter", `${body.radius * 2}px`);
      body.y = clamp(body.y, body.radius + 4, height - body.radius - 4);
      place(body);
    }
  }, [stageData]);

  function merge(key: string) {
    clearTimers();
    setSplit({ key, merging: true });
    timers.current.push(setTimeout(() => {
      splitKey.current = null;
      setSplit(null);
    }, 510));
  }

  function toggleSplit(key: string) {
    if (splitKey.current === key && !split?.merging) {
      merge(key);
      return;
    }
    clearTimers();
    splitKey.current = key;
    setSplit({ key, merging: false });
    timers.current.push(setTimeout(() => merge(key), 4600));
  }

  function startDrag(event: PointerEvent<HTMLButtonElement>, key: string) {
    if (event.button !== 0 || !event.isPrimary) return;
    suppressClick.current = null;
    const body = bodies.current.get(key);
    if (!body) return;
    grab.current = {
      body, pointer: event.pointerId,
      startX: event.clientX, startY: event.clientY,
      originX: body.x, originY: body.y,
      time: event.timeStamp, moved: false, vx: 0, vy: 0,
    };
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const drag = grab.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 7) return;
    if (!drag.moved) {
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
      drag.moved = true;
    }
    const { width, height } = size.current;
    const { body } = drag;
    const x = clamp(drag.originX + dx, body.radius / 2, width - body.radius / 2);
    const y = clamp(drag.originY + dy, body.radius + 4, height - body.radius - 4);
    const dt = Math.max(8, event.timeStamp - drag.time) / 1000;
    drag.vx = 0.38 * drag.vx + 0.62 * clamp((x - body.x) / dt, -720, 720);
    drag.vy = 0.38 * drag.vy + 0.62 * clamp((y - body.y) / dt, -460, 460);
    drag.time = event.timeStamp;
    body.x = x;
    body.y = y;
    place(body);
  }

  function endDrag(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const drag = grab.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    grab.current = null;
    if (!drag.moved) return;
    suppressClick.current = event.pointerId;
    delete event.currentTarget.dataset.dragging;
    drag.body.homeY = drag.body.y;
    const recent = !cancelled && event.timeStamp - drag.time < 100;
    drag.body.vx = recent ? drag.vx * 0.58 : 0;
    drag.body.vy = recent ? drag.vy * 0.48 : 0;
  }

  function focusBubble(key: string) {
    focused.current = key;
    const body = bodies.current.get(key);
    if (!body) return;
    body.x = clamp(body.x, body.radius, size.current.width - body.radius);
    place(body);
  }

  const activeCategory = stageData.categories.find((category) => category.key === split?.key);
  const tools = stageData.tools.filter((tool) => tool.cat === activeCategory?.label);
  const activeBody = split && bodies.current.get(split.key);
  const { width, height } = size.current;
  const narrow = width < 480;
  const step = narrow ? 84 : 116;
  const spread = step * (tools.length > 2 ? 1.46 : 0.98);
  const centerX = activeBody ? clamp(activeBody.x, spread, width - spread) : 0;
  const centerY = activeBody ? clamp(activeBody.y, spread, height - spread) : 0;

  return (
    <div className={styles.scene}>
      <span id={instructionsId} className="sr-only">泡を選ぶと関連するスキルが表示されます。</span>
      <div ref={field} className={styles.field} role="group" aria-label="スキル" aria-describedby={instructionsId}>
        {stageData.categories.map((category, index) => {
          const active = category.key === split?.key;
          return (
            <div className={styles.node} key={category.key} data-active={active || undefined}>
              <button
                type="button"
                data-bubble={category.key}
                data-level={category.current}
                aria-label={`${category.label}、${category.current} / 10`}
                aria-expanded={active && !split?.merging}
                className={styles.bubble}
                style={{ "--tone": [159, 177, 166, 193, 151, 181][index % 6] } as CSSProperties}
                onPointerDown={(event) => startDrag(event, category.key)}
                onPointerMove={moveDrag}
                onPointerLeave={() => { if (grab.current && !grab.current.moved) grab.current = null; }}
                onPointerUp={endDrag}
                onPointerCancel={(event) => endDrag(event, true)}
                onLostPointerCapture={(event) => endDrag(event, true)}
                onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) focusBubble(category.key); }}
                onBlur={() => { focused.current = null; }}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && active && !split?.merging) merge(category.key);
                }}
                onClick={(event) => {
                  if (event.detail && suppressClick.current !== null) {
                    suppressClick.current = null;
                    return;
                  }
                  toggleSplit(category.key);
                }}
              >
                <span className={styles.orb} data-split={active && !split?.merging || undefined}>
                  <span>{shortLabels[category.key] ?? RADAR_LABEL_SHORT[category.label] ?? category.label}</span>
                </span>
                {active && activeBody && (
                  <span className={styles.children} data-merging={split?.merging || undefined} aria-hidden="true">
                    {tools.map((tool, toolIndex) => {
                      const angle = -Math.PI / 2 + (2 * Math.PI * toolIndex) / tools.length;
                      const orbit = step * (tools.length > 2 ? 0.98 : 0.49);
                      const x = centerX - activeBody.x + Math.cos(angle + (tools.length === 2 ? Math.PI / 2 : 0)) * orbit;
                      const y = centerY - activeBody.y + Math.sin(angle + (tools.length === 2 ? Math.PI / 2 : 0)) * orbit;
                      return (
                        <span
                          key={tool.label}
                          className={`${styles.orb} ${styles.child}`}
                          style={{ "--x": `${x}px`, "--y": `${y}px`, "--child-size": `${(narrow ? 67 : 87) + 3.5 * tool.level}px` } as CSSProperties}
                        >
                          <span>{tool.label}</span>
                        </span>
                      );
                    })}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {split && !split.merging ? tools.map((tool) => tool.label).join("、") : ""}
      </p>
      <button
        type="button"
        className={styles.motionToggle}
        aria-label="泡の動きを一時停止"
        aria-pressed={motionPaused}
        onClick={() => {
          paused.current = !paused.current;
          setMotionPaused(paused.current);
        }}
      >
        <span aria-hidden="true">{motionPaused ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
