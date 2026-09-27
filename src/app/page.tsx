import Image from "next/image";
import Link from "next/link";
import YouTubeFeature from "@/components/YouTubeFeature";
import HomeMotion from "@/components/HomeMotion";
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

export default function Home() {
  return (
    <main className={styles.page} data-home-motion>
      <HomeMotion />
      <section className={styles.masthead} aria-labelledby="home-title">
        <div className={styles.heroTopline}><span>YUDAI BABA / 五目飯</span><span>PORTFOLIO — 2026</span></div>
        <div className={styles.heroHeadline} data-reveal="copy">
          <p className={styles.heroKicker}>異なるものが、出会うとき。</p>
          <h1 id="home-title" className={styles.title}><span>まぜる。</span><span>ずらす。</span><span>つくる<span className={styles.period}>。</span></span></h1>
        </div>
        <div className={styles.heroCollage} data-reveal="image" aria-label="活動を象徴する写真のコラージュ">
          <figure className={styles.collageCity}><Image src="/images/mv_kagurazaka_1.png" alt="街を歩き、建築や暮らしを観察する" fill priority sizes="(max-width: 760px) 68vw, 32vw" /><figcaption>01 / OBSERVE</figcaption></figure>
          <figure className={styles.collageCulture}><Image src="/images/portfolio/culture-beer-05.jpg" alt="文化部の企画で交わる人とアイデア" fill sizes="(max-width: 760px) 46vw, 20vw" /><figcaption>02 / CONNECT</figcaption></figure>
          <figure className={styles.collageCode}><Image src="/images/map_realestate_1.png" alt="一種単価マップの画面" fill sizes="(max-width: 760px) 48vw, 19vw" /><figcaption>03 / BUILD</figcaption></figure>
          <span className={styles.collageStamp}>五<br />目<br />飯<span>GOMOKU</span></span>
        </div>
        <div className={styles.heroBottomline}><p>建築 × 不動産 × 文化 × デジタル<br />分野の境界から、使える仕組みをつくる。</p><Link href="#manifesto">SCROLL TO EXPLORE <span>↓</span></Link></div>
      </section>

      <section id="manifesto" className={styles.manifesto} aria-label="Manifesto">
        <div className={styles.manifestoIndex}>00 / WHAT I DO <span>↘</span></div>
        <h2 className={styles.manifestoLead}>専門を<span>越える。</span><br />違和感を<span>形にする。</span></h2>
        <div className={styles.manifestoBody}><p>街を歩いて観察する。事業の数字を読む。人が動く場を企画する。必要なら、自分で道具をつくる。</p><p>一つの肩書きでは収まらない仕事を、現場から始める。</p><Link href="/about">ABOUT MY THINKING <span>↗</span></Link></div>
        <div className={styles.manifestoKeywords} aria-hidden="true"><span>FIELD</span><span>IDEA</span><span>CODE</span><span>CULTURE</span></div>
      </section>

      {topics.map((topic) => (
        <section id={topic.id} className={`${styles.topic} ${topic.className}`} key={topic.id} aria-labelledby={`${topic.id}-title`}>
          <div className={styles.backgroundIndex} aria-hidden="true">{topic.number}</div>
          <div className={styles.orbitField} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.signalLegend} aria-hidden="true">{topic.ticker}</div>
          {topic.id === "real-estate" && <div className={styles.scanTracks} aria-hidden="true"><i /><i /><i /></div>}
          <header className={styles.topicHeader} data-reveal="copy">
            <div><p className={styles.meta}>{topic.label}</p><h2 id={`${topic.id}-title`}>{topic.title}</h2><p className={styles.topicLead}>{topic.lead}</p></div>
          </header>
          <div className={styles.topicProjects}>
            {topic.projects.map((project, index) => (
              <article className={`${styles.topicProject} ${index === 0 ? styles.topicProjectLead : ""}`} key={project.href} data-reveal="project" style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}>
                <Link href={project.href} className={styles.projectLink} aria-label={`${project.title}の詳細を見る`}>
                  {project.image ? <div className={styles.topicImage}><Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /><span className={styles.imageAction} aria-hidden="true">VIEW PROJECT <b>↗</b></span></div> : <div className={styles.underwritingVisual} aria-hidden="true"><span>{project.visual ?? "PROJECT / FIELD NOTE"}</span><i /><i /><i /><b>{project.title}</b><em className={styles.imageAction}>VIEW PROJECT <strong>↗</strong></em></div>}
                  <div className={styles.topicProjectCopy}><p className={styles.meta}>Project {String(index + 1).padStart(2, "0")}</p><h3>{project.title}<span className={styles.titleArrow} aria-hidden="true">↗</span></h3><p>{project.text}</p></div>
                </Link>
              </article>
            ))}
          </div>
          {topic.id === "culture" && <YouTubeFeature videoId="AV41DNDRaMk" channelUrl="https://www.youtube.com/@vzwtim" uploadsHandle="vzwtim" />}
          <div className={styles.movingRule} aria-hidden="true" />
        </section>
      ))}
    </main>
  );
}
