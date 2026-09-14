import CuriosityHero from "@/components/CuriosityHero";
import Image from "next/image";
import Link from "next/link";
import YouTubeFeature from "@/components/YouTubeFeature";
import { hotelProject } from "@/data/featuredProjects";
import styles from "./refresh.module.css";

const topics = [
  {
    id: "real-estate",
    number: "01",
    label: "Real estate / Architecture",
    title: "不動産・建築",
    lead: "土地と建物を観察し、事業として判断できる形へ。収支、地図、研究、設計と実践を横断します。",
    ticker: "UNDERWRITING　FIELDWORK　ARCHITECTURE　MAP　ACQUISITION",
    className: styles.topicScan,
    projects: [
      { title: hotelProject.title, text: hotelProject.synopsis, href: hotelProject.href!, image: undefined, visual: "underwriting" },
      { title: "都市動態論", text: "地図の分析から、都市に残る生活の痕跡とリズムを読む研究。", href: "/works/master-thesis", image: "/images/figure_master.webp" },
      { title: "小屋改修実践PJ", text: "老朽化した小屋を観察し、修復と再利用によって使える状態へつないだ。", href: "/works/odo-renovation", image: "/images/image_odo_4.jpg" },
    ],
  },
  {
    id: "culture",
    number: "02",
    label: "Culture / Economy / Planning",
    title: "文化・経済・企画",
    lead: "人が何を大切にし、どう関係をつくるか。フィールドワークと事業企画、組織への働きかけを往復します。",
    ticker: "CULTURE　ECONOMY　PLANNING　ETHNOGRAPHY　DIALOGUE",
    className: styles.topicAsanoha,
    projects: [
      { title: "南三陸エスノグラフィ", text: "写真を通して、歌津地方における「守る・守られる」関係を見つめた記録。", href: "/works/sanriku-coast", image: "/images/mv_sanriku.jpg" },
      { title: "樹木葬事業立案", text: "市場、競合、対象、収支を整理し、自然と共生する事業の形を考えた。", href: "/works/mokumoku-pj", image: "/images/figure_mokumoku_3.png" },
      { title: "水でつながる小川町", text: "地域を歩き、人と水の関わりをフィールドワークと提案へつないだ。", href: "/works/ogawamachi-water", image: "/images/mv_ogawamachi_1.png" },
    ],
  },
  {
    id: "digital",
    number: "03",
    label: "DX / Digital",
    title: "DX・デジタル",
    lead: "日々の小さな不便や業務の引っかかりを、地図、データ、Webアプリという使える道具に変えます。",
    ticker: "DX　DIGITAL　DATA　MAP　PROTOTYPE　WEB APPLICATION",
    className: styles.topicDigital,
    projects: [
      { title: "一種単価マップ", text: "不動産の判断材料を、地図上で直感的に比較できる形へ。", href: "/works/realestate-map1", image: "/images/map_realestate_1.png" },
      { title: "Swift Revise", text: "不動産知識を気軽に反復できる、一問一答の学習アプリ。", href: "/works/swift-revise", image: "/images/appview_quiz.png" },
      { title: "Multi AI Chat", text: "複数のAIキャラクターとの対話を、一つの画面で試すプロトタイプ。", href: "/works/multi-ai-chat", image: "/images/appview_chat.png" },
    ],
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <CuriosityHero />
      <div className={styles.editorialIntro}><p className={styles.meta}>SELECTED EXPLORATIONS / 01 — 03</p><p>見る。考える。つくってみる。<br /><span>興味を起点に、分野を横断する。</span></p><Link href="/works">すべての作品を見る ↗</Link></div>

      {topics.map((topic) => (
        <section id={topic.id} className={`${styles.topic} ${topic.className}`} key={topic.id} aria-labelledby={`${topic.id}-title`}>
          <div className={styles.backgroundIndex} aria-hidden="true">{topic.number}</div>
          <div className={styles.orbitField} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.signalLegend} aria-hidden="true">{topic.ticker}</div>
          {topic.id === "real-estate" && <div className={styles.scanTracks} aria-hidden="true"><i /><i /><i /></div>}
          <header className={styles.topicHeader}>
            <div><p className={styles.meta}>{topic.label}</p><h2 id={`${topic.id}-title`}>{topic.title}</h2><p className={styles.topicLead}>{topic.lead}</p></div>
          </header>
          <div className={styles.topicProjects}>
            {topic.projects.map((project, index) => (
              <article className={`${styles.topicProject} ${index === 0 ? styles.topicProjectLead : ""}`} key={project.href}>
                {project.image ? <div className={styles.topicImage}><Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /></div> : <div className={styles.underwritingVisual} aria-hidden="true"><span>OPERATING ASSET</span><i /><i /><i /><b>COMPARE / DECIDE</b></div>}
                <div className={styles.topicProjectCopy}><p className={styles.meta}>Project {String(index + 1).padStart(2, "0")}</p><h3>{project.title}</h3><p>{project.text}</p><Link href={project.href} className={styles.topicLink}>詳しく見る&nbsp; →</Link></div>
              </article>
            ))}
          </div>
          {topic.id === "culture" && <YouTubeFeature channelUrl="https://www.youtube.com/@vzwtim" uploadsHandle="vzwtim" />}
          <div className={styles.movingRule} aria-hidden="true" />
        </section>
      ))}
    </main>
  );
}
