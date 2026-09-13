export type ProjectStatus = "completed" | "ongoing" | "planned";

export interface FeaturedProject {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  domain: string;
  status: ProjectStatus;
  statusLabel: string;
  periodLabel: string;
  roleSummary: string;
  resultOrProgress: string;
  synopsis: string;
  href?: string;
  image?: string;
}

export const hotelProject: FeaturedProject = {
  slug: "hotel-underwriting",
  index: "01",
  title: "初めてのホテル事業を、判断できる収支にする",
  shortTitle: "ホテル事業の収支検討・取得",
  domain: "REAL ESTATE / UNDERWRITING",
  status: "completed",
  statusLabel: "取得まで完了",
  periodLabel: "時期非公開",
  roleSummary:
    "外部オペレーターの開拓・交渉、比較可能な収支モデルと社内説明資料の作成、意思決定プロセスの推進を担当。契約実務は上司が担当。",
  resultOrProgress:
    "複数案を比較できる収支を整え、社内決裁を経て計画地の取得に至った。",
  synopsis:
    "住宅・オフィスを中心としてきた会社で、オペレーショナルアセットとしてのホテルをどう評価するか。既存の住宅収支を置き換えるのではなく、運営方式と事業リスクを比較できる判断材料へ組み直した。",
  href: "/projects/hotel-underwriting",
};

export const featuredProjects: FeaturedProject[] = [
  hotelProject,
  {
    slug: "master-thesis",
    index: "02",
    title: "都市のリズムを、生活の痕跡から読む",
    shortTitle: "都市動態論",
    domain: "URBANISM / RESEARCH",
    status: "completed",
    statusLabel: "研究完了",
    periodLabel: "大学院",
    roleSummary: "地図手法を応用し、都市に残る生活の痕跡とリズムを観察・分析。",
    resultOrProgress: "修士研究として整理。",
    synopsis: "発展途上国向けのスラム検出地図手法を先進国へ応用し、動的均衡のなかにある生活の痕跡を観察した研究。",
    href: "/works/master-thesis",
    image: "/images/figure_master.webp",
  },
  {
    slug: "odo-renovation",
    index: "03",
    title: "古い小屋を観察し、手を動かして直す",
    shortTitle: "小屋改修実践PJ",
    domain: "ARCHITECTURE / MAKING",
    status: "completed",
    statusLabel: "改修完了",
    periodLabel: "既存活動",
    roleSummary: "老朽化した小屋を観察し、修復と再利用を実践。",
    resultOrProgress: "既存サイト掲載済み。",
    synopsis: "場所に残る素材と傷みを読み、壊して置き換えるのではなく、修復と再利用によって使える状態へつないだ。",
    href: "/works/odo-renovation",
    image: "/images/image_odo_4.jpg",
  },
];
