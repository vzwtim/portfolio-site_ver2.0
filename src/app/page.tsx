import Image from "next/image";
import Link from "next/link";
import YouTubeFeature from "@/components/YouTubeFeature";
import ProjectMotionPreview from "@/components/ProjectMotionPreview";
import HomeMotion from "@/components/HomeMotion";
import ProjectGallery from "@/components/ProjectGallery";
import { IngredientField, BlueprintField, AsanohaField, DigitalField } from "@/components/FieldBackdrop";
import { hotelProject } from "@/data/featuredProjects";
import styles from "./refresh.module.css";

const topics = [
  {
    id: "real-estate",
    number: "01",
    label: "Space Creation",
    title: "空間・創造",
    lead: "街を読み、事業を組み立て、空間をつくる。不動産への投資から建築の研究・改修まで、場所の可能性を形にします。",
    ticker: "UNDERWRITING　FIELDWORK　ARCHITECTURE　MAP　ACQUISITION",
    className: styles.topicScan,
    projects: [
      { title: "不動産開発", text: "不動産への出資、住宅・オフィスの売買、当社初のホテル開発。収支の検討と関係者との調整を通じ、事業を前へ進めます。", href: hotelProject.href!, image: hotelProject.image, ratio: "3 / 2", visual: "underwriting" },
      { title: "都市動態論", text: "地図とフィールドワークから、都市に刻まれた暮らしの痕跡や変化を読み解く。", href: "/works/master-thesis", image: "/images/figure_master.webp", ratio: "16 / 9", fit: "cover" },
      { title: "小屋改修実践PJ", text: "古い小屋を、自分たちの手で使える場所へ。調査から修繕まで、現場で考え、つくる実践。", href: "/works/odo-renovation", image: "/images/image_odo_4.jpg", ratio: "4 / 3" },
    ],
  },
  {
    id: "culture",
    number: "02",
    label: "Culture / Planning",
    title: "文化・企画",
    lead: "人が集まり、話し、何かが始まる。そのきっかけを、地域の企画や社内の文化活動、組織づくりのなかで育てています。",
    ticker: "CULTURE　PLANNING　ETHNOGRAPHY　DIALOGUE　FIELDWORK",
    className: styles.topicAsanoha,
    projects: [
      { title: "日光市今市U35実践アイデアコンペ", text: "宿場町・今市を舞台に、若手のアイデアと地域の実践をつなぐコンペ。企画・運営に加え、公式Instagramの運用や動画・ポスター制作まで担う。", href: "/works/competition-mentor-support", image: "/images/portfolio/maki-competition-cover.webp", ratio: "1800 / 1013", visual: "COMPETITION / COMMUNITY" },
      { title: "社内文化部企画", text: "地図、ワイン、ビール。好きなものを持ち寄り、部署や立場を越えて話せる場をつくる。", href: "/works/company-culture-club", image: "/images/portfolio/culture-beer-05.jpg", ratio: "1420 / 948", visual: "CULTURE / COMMUNITY" },
      { title: "組織風土改革プロジェクト", text: "部署の境界を越え、声が届き、行動につながる組織へ。対話の場と仕組みの両方から取り組む。", href: "/works/organizational-culture-reform", image: "/images/portfolio/org-culture-reform-private.webp", ratio: "987 / 642", visual: "ORGANIZATION / DIALOGUE" },
    ],
  },
  {
    id: "digital",
    number: "03",
    label: "Digital & Tech",
    title: "デジタル",
    lead: "気になることは、自分でつくって試す。コードやデータを道具に、日々の学びと仕事の進め方を少しずつ変えていきます。",
    ticker: "DX　DIGITAL　DATA　MAP　PROTOTYPE　WEB APPLICATION",
    className: styles.topicDigital,
    projects: [
      { title: "デジカフェ・デジラボ", text: "AIやデジタルを、誰もが試せる道具に。学び合い、小さくつくり、仕事に持ち帰る勉強会。", href: "/works/internal-dx-workshop", image: "/images/portfolio/dx-workshop-01.webp", ratio: "1376 / 768", fit: "contain", visual: "DX / LEARNING" },
      { title: "StudyFlow", text: "学びたいときに、ひと問ずつ。不動産の知識を繰り返し身につけるための学習アプリ。", href: "/works/studyflow", image: "/images/appview_quiz.png", ratio: "4 / 3", fit: "contain" },
      { title: "東京時間マップ", text: "東京の近さを、距離ではなく時間から考える。待ち合わせに最適な駅を探す「飲む駅」や、家賃と重ねる「住む駅」まで育てている、旗艦の個人制作。", href: "/works/tokyo-time-warp", image: "/images/portfolio/time-map-product-hd.webp", ratio: "8 / 5", fit: "contain", visual: "TOKYO TIME MAP" },
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
      <div className={styles.readingProgress} data-reading-progress aria-hidden="true" />
      <section className={styles.masthead} aria-labelledby="home-title" data-motion-section>
        <IngredientField />
        <div className={styles.scanBeam} aria-hidden="true" />
        <div className={styles.mastCopy} data-reveal="copy">
          <p className={styles.eyebrow}>Yudai Baba / Portfolio</p>
          <h1 id="home-title" className={styles.title}><span className={styles.titleLine}><MotionLetters text="ぼくは、" /></span><span className={styles.titleLine}><MotionLetters text="五目飯。" /></span></h1>
          <div id="home-intro" className={styles.heroIntro}><p className={styles.thesis}><span className={styles.introPhrase}>建築、不動産、文化、テクノロジー。</span><br /><span className={styles.introPhrase}>違う興味を混ぜながら、</span><span className={styles.introPhrase}>場所と人の新しい可能性を</span><span className={styles.introPhrase}>つくっています。</span></p>
          <nav className={styles.actions} aria-label="ポートフォリオの見どころ">
            {topics.map((topic) => <Link className={styles.textLink} href={`#${topic.id}`} key={topic.id}>{topic.title}</Link>)}
            <Link className={styles.textLink} href="/apps">My Apps &amp; Sites</Link>
          </nav></div>
          <p className={styles.roleLine}>不動産開発 × 建築研究 × デジタル制作</p>
          <Link className={styles.mobileExplore} href="#home-intro">活動を見る <span aria-hidden="true">↓</span></Link>
        </div>
        <figure className={styles.heroPlate}>
          <picture><source media="(max-width: 600px)" srcSet="/_next/image?url=%2Fimages%2Fmv_gomoku_1_mobile.jpg&w=1080&q=75" /><Image className={styles.heroImage} data-parallax="image" src="/images/mv_gomoku_1.jpg" alt="器に盛り付けた五目飯" fill priority sizes="(max-width: 760px) 100vw, 56vw" /></picture>
          <figcaption className={`${styles.plateLabel} ${styles.meta}`}>A portrait in ingredients / 01</figcaption>
        </figure>
      </section>

      <section className="relative z-[1] px-[clamp(1.25rem,6vw,6rem)] py-[clamp(3.5rem,8vw,6rem)]" style={{ background: "#f1efe7" }} aria-labelledby="featured-timemap-title" data-motion-section>
        <p className="text-xs font-bold tracking-[0.16em] uppercase" style={{ color: "#008877" }}>Featured Project</p>
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 id="featured-timemap-title" className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-snug" style={{ fontFamily: '"Shippori Mincho", serif', textWrap: "balance" }}>東京時間マップ<span className="mt-2 block text-base sm:text-lg" style={{ color: "#4b5563" }}>東京の距離 / TOKYO TIME WARP</span></h2>
            <p className="mt-6 leading-loose text-gray-700">東京の近さを、キロメートルではなく「分」で測る時間地図。中心に置いた駅からの所要時間で地図が伸び縮みする表現に、複数人の待ち合わせに最適な駅を探す「飲む駅」、家賃相場と重ねて住む場所を探す「住む駅」、沿線比較までを実装した。大阪にも対応し、家賃相場は11路線251駅分を収録している。</p>
            <p className="mt-4 leading-loose text-gray-700">つくり方にもこだわった。当初の距離ベースの推定モデルは実際とずれると分かって廃止し、時刻表の実測で検証して作り直し、サイトの誤りはソースまで直して本番へ反映している。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="https://tokyo-time-map.babachan.workers.dev/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-[#111311] px-5 py-2 text-sm font-bold text-white hover:bg-[#008877] transition-colors">サイトを開く ↗</Link>
              <Link href="/works/tokyo-time-warp" className="inline-flex min-h-11 items-center rounded-full border border-[#111311] px-5 py-2 text-sm font-bold hover:bg-white transition-colors">制作の詳細</Link>
              <Link href="https://www.instagram.com/mapl.ab/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#bb5555] px-5 py-2 text-sm font-bold text-[#bb5555] hover:bg-white transition-colors">Instagram @mapl.ab（お地図ラボ）↗</Link>
              <Link href="https://note.com/mapl_ab" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-gray-400 px-5 py-2 text-sm font-bold text-gray-700 hover:bg-white transition-colors">note お地図ラボ ↗</Link>
            </div>
          </div>
          <Link href="/works/tokyo-time-warp" className="block overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008877]" aria-label="東京時間マップの詳細を見る">
            <Image src="/images/portfolio/time-map-product-hd.webp" alt="東京時間マップの画面" width={1348} height={936} className="h-auto w-full" sizes="(max-width:1023px) calc(100vw - 40px), 44vw" />
            <span className="mt-3 block text-sm font-bold text-[#008877]">大きな画面で見る → 制作の詳細へ</span>
          </Link>
        </div>
      </section>

      {topics.map((topic) => (
        <section id={topic.id} className={`${styles.topic} ${topic.className}`} key={topic.id} aria-labelledby={`${topic.id}-title`} data-motion-section data-scene-surface>
          <span className={styles.chapterVertical} aria-hidden="true">{topic.label}</span>
          <div className={styles.backgroundIndex} aria-hidden="true">{topic.number}</div>
          {topic.id === "real-estate" && <BlueprintField />}
          {topic.id === "digital" && <DigitalField />}
          {topic.id === "culture" && <AsanohaField />}
          <div className={styles.signalLegend} aria-hidden="true">{topic.ticker}</div>

          <header className={styles.topicHeader}>
            <span className={styles.chapterNumber} aria-hidden="true">{topic.number} / 03</span>
            <div><p className={styles.meta}>{topic.label}</p><h2 id={`${topic.id}-title`} className={styles.titleLine}>{topic.title}</h2><p className={styles.topicLead}>{topic.lead}</p><div className={styles.chapterProgress} aria-hidden="true"><i /></div></div>
          </header>
          <ProjectGallery>
            {topic.projects.map((project, index) => (
              <article className={`${styles.topicProject} ${index === 0 ? styles.topicProjectLead : ""}`} key={project.href}>
                {["/works/odo-renovation", "/works/tokyo-time-warp"].includes(project.href) && project.image ? <ProjectMotionPreview image={project.image} href={project.href} title={project.title} ratio={project.ratio} videoSrc={project.href === "/works/tokyo-time-warp" ? "/videos/timemap-product-preview.mp4" : undefined} fit={project.href === "/works/tokyo-time-warp" ? "contain" : "cover"}>
                  <div className={styles.topicProjectCopy}><p className={styles.meta}>Project {String(index + 1).padStart(2, "0")}</p><h3>{project.title}<span className={styles.titleArrow} aria-hidden="true">↗</span></h3><p>{project.text}</p></div>
                </ProjectMotionPreview> : <Link href={project.href} className={styles.projectLink} aria-label={`${project.title}の詳細を見る`}>
                  {project.image ? <div className={styles.topicImage} data-project-image style={{ "--source-ratio": project.ratio } as React.CSSProperties} data-fit={"fit" in project ? project.fit : "cover"}><Image data-parallax="image" src={project.image} alt="" fill quality={90} style={project.href === "/works/master-thesis" ? { objectFit: "cover" } : undefined} sizes={index === 0 ? "(max-width: 600px) calc(100vw - 40px), (max-width: 899px) 46vw, (max-width: 1506px) 38vw, 540px" : "(max-width: 600px) calc(100vw - 40px), (max-width: 899px) 70vw, (max-width: 1506px) 34vw, 480px"} /></div> : <div className={styles.underwritingVisual} aria-hidden="true"><span>{project.visual ?? "PROJECT / FIELD NOTE"}</span><i /><i /><i /><b>{project.title}</b></div>}
                  <div className={styles.topicProjectCopy}><p className={styles.meta}>Project {String(index + 1).padStart(2, "0")}</p><h3>{project.title}<span className={styles.titleArrow} aria-hidden="true">↗</span></h3><p>{project.text}</p></div>
                </Link>}
              </article>
            ))}
          </ProjectGallery>
          {topic.id === "culture" && <YouTubeFeature videoId="AV41DNDRaMk" channelUrl="https://www.youtube.com/@vzwtim" uploadsHandle="vzwtim" />}
          <div className={styles.movingRule} aria-hidden="true" />
        </section>
      ))}
      <section className={styles.landscapeBridge} data-motion-section data-landscape-bridge aria-label="風景へ">
        <svg className={styles.bridgeTracks} viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-80 20H480Q640 20 720 170T960 300H1520" />
          <path d="M-80 80H400Q560 80 640 230T880 360H1520" />
          <path d="M-80 140H320Q480 140 560 290T800 410H1520" />
        </svg>
        <p className={styles.bridgeCaption}>街も、仕組みも、その先の暮らしへ。</p>
        <span className={styles.bridgeLabel}>BACK TO THE LANDSCAPE</span>
      </section>
    </main>
  );
}

