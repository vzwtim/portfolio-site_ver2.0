import Image from "next/image";
import { Fragment } from "react";
import ChapterTransition from "@/components/ChapterTransition";
import Link from "next/link";
import YouTubeFeature from "@/components/YouTubeFeature";
import HomeMotion from "@/components/HomeMotion";
import { IngredientField, BlueprintField, DigitalField } from "@/components/FieldBackdrop";
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
      { title: hotelProject.title, text: hotelProject.synopsis, href: hotelProject.href!, image: hotelProject.image, visual: "underwriting" },
      { title: "都市動態論", text: "地図の分析から、都市に残る生活の痕跡とリズムを読む研究。", href: "/works/master-thesis", image: "/images/figure_master.webp" },
      { title: "小屋改修実践PJ", text: "老朽化した小屋を観察し、修復と再利用によって使える状態へつないだ。", href: "/works/odo-renovation", image: "/images/image_odo_4.jpg" },
    ],
  },
  {
    id: "culture",
    number: "02",
    label: "Culture / Planning",
    title: "文化・企画",
    lead: "人が何を大切にし、どう関係をつくるか。フィールドワークと事業企画、組織への働きかけを往復します。",
    ticker: "CULTURE　PLANNING　ETHNOGRAPHY　DIALOGUE　FIELDWORK",
    className: styles.topicAsanoha,
    projects: [
      { title: "日光市今市U35実践アイデアコンペ", text: "若手の建築・まちづくり提案を地域での実践につなげるコンペで、企画・運営をサポート。", href: "/works/competition-mentor-support", image: "/images/portfolio/maki-competition-cover.webp", visual: "COMPETITION / COMMUNITY" },
      { title: "社内文化部企画", text: "地図会、ワイン会、ビール会を通じ、立場を越えた交流と新しい関心が生まれる場を企画。", href: "/works/company-culture-club", image: "/images/portfolio/culture-beer-05.jpg", visual: "CULTURE / COMMUNITY" },
      { title: "組織風土改革プロジェクト", text: "経営企画の一員として、対話と仕組みの両面から組織風土の改善に取り組む。", href: "/works/organizational-culture-reform", image: "/images/portfolio/org-culture-reform.jpg", visual: "ORGANIZATION / DIALOGUE" },
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
      { title: "社内DX勉強会", text: "デジタルを一部の専門知識にせず、社内で学び合い、業務に持ち帰るための勉強会。", href: "/works/internal-dx-workshop", image: "/images/portfolio/dx-workshop-01.webp", visual: "DX / LEARNING" },
      { title: "Swift Revise", text: "不動産知識を気軽に反復できる、一問一答の学習アプリ。", href: "/works/swift-revise", image: "/images/appview_quiz.png" },
      { title: "一種単価マップ", text: "東京都の土地価格を、容積率を踏まえた一種単価で比較できるインタラクティブマップ。", href: "/works/realestate-map1", image: "/images/map_realestate_1.png", visual: "LAND / UNIT PRICE MAP" },
    ],
  },
];

function MotionLetters({ text }: { text: string }) {
  return <span className={styles.motionLetters} aria-label={text}>{Array.from(text).map((letter, i) => <span key={i} aria-hidden="true" style={{ "--letter-index": i } as React.CSSProperties}>{letter}</span>)}</span>;
}

export default function Home() {
  return (
    <main className={styles.page} data-home-motion>
      <HomeMotion />
      <div className={styles.readingProgress} aria-hidden="true" />
      <section className={styles.masthead} aria-labelledby="home-title" data-motion-section>
        <IngredientField />
        <div className={styles.scanBeam} aria-hidden="true" />
        <div className={styles.mastCopy} data-reveal="copy">
          <p className={styles.eyebrow}>Yudai Baba / Portfolio</p>
          <h1 id="home-title" className={styles.title}><span className={styles.titleLine}><MotionLetters text="ぼくは、" /></span><span className={styles.titleLine}><MotionLetters text="五目飯。" /></span></h1>
          <p className={styles.thesis}>場所をよく見て、まだ言葉になっていない価値を読み解く。<br />人と仕組みをつなぎながら、使える形まで持っていく。</p>
          <nav className={styles.actions} aria-label="興味のある分野">
            {topics.map((topic) => <Link className={styles.textLink} data-magnetic href={`#${topic.id}`} key={topic.id}>{topic.title}</Link>)}
          </nav>
        </div>
        <figure className={styles.heroPlate} data-reveal="image">
          <Image className={styles.heroImage} data-parallax="image" src="/images/mv_gomoku_1.jpg" alt="器に盛り付けた五目飯" fill priority sizes="(max-width: 760px) 100vw, 56vw" />
          <figcaption className={`${styles.plateLabel} ${styles.meta}`}>A portrait in ingredients / 01</figcaption>
        </figure>
      </section>

      {topics.map((topic, chapterIndex) => (
        <Fragment key={topic.id}>
        {chapterIndex > 0 && <ChapterTransition from={topics[chapterIndex - 1].number} to={topic.number} variant={chapterIndex === 1 ? "shutters" : "iris"} />}
        <section id={topic.id} className={`${styles.topic} ${topic.className}`} key={topic.id} aria-labelledby={`${topic.id}-title`} data-motion-section>
          <div className={styles.backgroundIndex} aria-hidden="true">{topic.number}</div>
          {topic.id === "real-estate" && <BlueprintField />}
          {topic.id === "digital" && <DigitalField />}
          <div className={styles.signalLegend} aria-hidden="true">{topic.ticker}</div>

          <header className={styles.topicHeader} data-reveal="copy">
            <span className={styles.chapterNumber} aria-hidden="true">{topic.number} / 03</span>
            <div><p className={styles.meta}>{topic.label}</p><h2 id={`${topic.id}-title`} className={styles.titleLine}><MotionLetters text={topic.title} /></h2><p className={styles.topicLead}>{topic.lead}</p><div className={styles.chapterProgress} aria-hidden="true"><i /></div></div>
          </header>
          <div className={styles.topicProjects}>
            {topic.projects.map((project, index) => (
              <article className={`${styles.topicProject} ${index === 0 ? styles.topicProjectLead : ""}`} key={project.href} data-reveal="project" style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}>
                <Link href={project.href} className={styles.projectLink} aria-label={`${project.title}の詳細を見る`}>
                  {project.image ? <div className={styles.topicImage} data-project-image><Image data-parallax="image" src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /><span className={styles.imageAction} aria-hidden="true">VIEW PROJECT <b>↗</b></span></div> : <div className={styles.underwritingVisual} aria-hidden="true"><span>{project.visual ?? "PROJECT / FIELD NOTE"}</span><i /><i /><i /><b>{project.title}</b><em className={styles.imageAction}>VIEW PROJECT <strong>↗</strong></em></div>}
                  <div className={styles.topicProjectCopy}><p className={styles.meta}>Project {String(index + 1).padStart(2, "0")}</p><h3>{project.title}<span className={styles.titleArrow} aria-hidden="true">↗</span></h3><p>{project.text}</p></div>
                </Link>
              </article>
            ))}
          </div>
          {topic.id === "culture" && <YouTubeFeature videoId="AV41DNDRaMk" channelUrl="https://www.youtube.com/@vzwtim" uploadsHandle="vzwtim" />}
          <div className={styles.movingRule} aria-hidden="true" />
        </section>
        </Fragment>
      ))}
    </main>
  );
}
