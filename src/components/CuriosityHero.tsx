"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CuriosityHero.module.css";

const ingredients = [
  { label: "五目飯", en: "A LITTLE BIT OF EVERYTHING", image: "/images/mv_gomoku_1.jpg", alt: "器に盛り付けた五目飯", note: "いろんな興味が、ひとつの自分になる。", href: "#real-estate", action: "中身をのぞく" },
  { label: "建築・都市", en: "READ THE PLACE", image: "/images/figure_master.webp", alt: "都市動態論の研究図版", note: "地図と現場を行き来して、場所を読む。", href: "/works/master-thesis", action: "都市動態論を見る" },
  { label: "文化・探求", en: "FOLLOW THE CURIOSITY", image: "/images/mv_sanriku.jpg", alt: "南三陸エスノグラフィの記録写真", note: "歩いて、出会って、視点が増えていく。", href: "/works/sanriku-coast", action: "南三陸の記録を見る" },
  { label: "デジタル", en: "MAKE IT WORK", image: "/images/appview_quiz.png", alt: "Swift Reviseのアプリ画面", note: "小さな不便を、使える道具に変える。", href: "/works/swift-revise", action: "アプリを見る" },
];

export default function CuriosityHero() {
  const [active, setActive] = useState(0);
  const item = ingredients[active];
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.topline}><span>YUDAI BABA — PERSONAL PORTFOLIO</span><span>観察 / 探求 / 実践</span></div>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <p className={styles.kicker}><span /> 好奇心の、その先へ。</p>
          <h1 id="home-title" className={styles.title}>ぼくは、<br /><span>五目飯。</span></h1>
          <p className={styles.description}>場所をよく見て、まだ言葉になっていない価値を読み解く。<br />人と仕組みをつなぎながら、使える形まで持っていく。</p>
          <div className={styles.ingredients} role="group" aria-label="興味の入口を切り替える">
            {ingredients.map((ingredient, index) => <button key={ingredient.label} type="button" aria-pressed={active === index} aria-controls="ingredient-preview" onClick={() => setActive(index)}><span>0{index + 1}</span>{ingredient.label}</button>)}
          </div>
        </div>
        <div className={styles.exhibit}>
          <div className={styles.vertical} aria-hidden="true">混ざると、面白い。</div>
          <div id="ingredient-preview" className={styles.preview}>
            <Link href={item.href} className={styles.imageLink} aria-label={item.action}>
              <Image key={item.image} src={item.image} alt={item.alt} fill priority={active === 0} sizes="(max-width: 760px) 90vw, 48vw" className={active === 3 ? styles.screen : styles.photo} />
              <span className={styles.open} aria-hidden="true">↗</span>
            </Link>
            <div className={styles.caption} aria-live="polite" aria-atomic="true"><span>0{active + 1} / {item.en}</span><p>{item.note}</p></div>
          </div>
          <Link href="/works/odo-renovation" className={styles.specimen}><div><Image src="/images/image_odo_4.jpg" alt="小屋改修実践プロジェクト" fill sizes="180px" /></div><span>FIELD NOTE / 小屋を直す ↗</span></Link>
          <span className={styles.stamp} aria-hidden="true">多趣味<br />探求中</span>
        </div>
      </div>
      <div className={styles.bottom}><a href="#real-estate">SCROLL TO EXPLORE <span>↓</span></a><p>ひとつの肩書きに、おさまらない。</p><Link href="/about">ABOUT ME ↗</Link></div>
    </section>
  );
}
