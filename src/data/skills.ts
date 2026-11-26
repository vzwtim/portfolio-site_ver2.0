// /src/data/skills.ts
// 棒グラフの項目は全ステージ共通で常に全表示。
// スコアは各ステージごとの固定値（0〜5、0でも表示）。
// レーダーは「現在＝選択ステージ」「伸びしろ＝future の値」を重ね表示。

export type StageKey = "highschool" | "university" | "graduate" | "current" | "future";

export interface SkillCategory {
  key: string;
  label: string;
  current: number; // 0-10（このステージの現在値 or 目標値）
  growth?: number; // ※使わない（互換のため残置）
}

export interface SkillTool {
  label: string;  // 表示名
  cat: string;    // カテゴリ（labelと一致する名前）
  level: number;  // 0-5（0でも表示）
  note?: string;  // 自由記述
}

// ステージ別ツールレベルのテーブル（ツール名→0〜5）
export type ToolLevelTable = Record<string, number>;

export interface StageSkillData {
  categories: SkillCategory[];
  tools: SkillTool[]; // 全ステージ同一項目（levelだけが変わる）
}

/** レーダーの並び（近い領域を隣接） */
export const RADAR_ORDER = [
  "建築・設計",
  "デザイン",
  "GIS・可視化",
  "データ分析",
  "DX/自動化",
  "プログラミング",
  "office365",
  "プロジェクトマネジメント",
  "コミュニケーション・プレゼン",
  "リサーチ・分析",
  "マーケティング",
  "語学",
  "不動産",
  "金融",
  "法務・コンプライアンス",
  "サステナビリティ/ESG",
  "顧客対応・CX",
  "教育・研修",
] as const;

/** レーダー軸の短縮ラベル */
export const RADAR_LABEL_SHORT: Record<string, string> = {
  "プログラミング": "プログラミング",
  "データ分析": "データ",
  "DX/自動化": "DX",
  "建築・設計": "建築",
  "デザイン": "デザイン",
  "GIS・可視化": "GIS",
  "不動産": "不動産",
  "金融": "金融",
  "マーケティング": "マーケ",
  "プロジェクトマネジメント": "PM",
  "法務・コンプライアンス": "法務",
  "コミュニケーション・プレゼン": "コミュ",
  "教育・研修": "教育",
  "リサーチ・分析": "リサーチ",
  "サステナビリティ/ESG": "ESG",
  "顧客対応・CX": "CX",
  "語学": "語学",
  "office365": "Office",
};

export const COLORS = {
  bar: "#bb5555",
  radarCurrent: "#bb5555",
  radarGrowth: "#008877",
} as const;

// 途中省略…（既存定義はそのままでOK）

/* ========= 棒グラフの“全項目”（共通メタ） ========= */
export const toolsMeta = [
  // 建築・設計
  { label: "AutoCAD",             cat: "建築・設計" },
  { label: "SketchUp",            cat: "建築・設計" },
  { label: "Rhino + Grasshopper", cat: "建築・設計", note: "定義づくり〜最適化" },
  { label: "Twinmotion",          cat: "建築・設計" },
  { label: "Lumion",              cat: "建築・設計" },

  // デザイン
  { label: "Adobe Illustrator",   cat: "デザイン" },
  { label: "Adobe Photoshop",     cat: "デザイン" },
  { label: "Inkscape",            cat: "デザイン" },
  { label: "Blender",             cat: "デザイン" },
  { label: "DaVinci Resolve",     cat: "デザイン" },

  // GIS・可視化
  { label: "ArcGIS",              cat: "GIS・可視化" },
  { label: "QGIS",                cat: "GIS・可視化" },
  { label: "Kepler.gl",           cat: "GIS・可視化", note: "地図の可視化＆ダッシュボード" },

  // データ/プログラミング/DX
  { label: "Python",              cat: "プログラミング", note: "業務自動化で継続利用" },
  { label: "JavaScript / TypeScript", cat: "プログラミング", note: "ポートフォリオで実装中" },
  { label: "Node.js",             cat: "プログラミング" },
  { label: "Pandas",              cat: "データ分析" },
  { label: "NumPy",               cat: "データ分析" },
  { label: "業務自動化（Python+Excel）", cat: "DX/自動化", note: "やる気満々！改善中" },
  { label: "生成AI活用",             cat: "DX/自動化", note: "調査・資料・制作の実務活用" },
  { label: "AIアプリ制作",           cat: "DX/自動化", note: "AIと組んだ個人制作・自動化" },
  { label: "ダッシュボード試作（Kepler/BI）", cat: "DX/自動化" },

  // office
  { label: "Excel",               cat: "office365" },
  { label: "PowerPoint",          cat: "office365" },

  // 不動産・金融
  { label: "土地仕入・ボリューム検討", cat: "不動産" },
  { label: "事業収支/DCF（Excel）",     cat: "不動産" },
  { label: "不動産証券化の基礎",        cat: "不動産" },
  { label: "DCF/NPV・IRR",             cat: "金融" },
  { label: "LTV/DSCR",                 cat: "金融" },

  // PM/コミュ/教育/リサーチ/マーケ/法務/ESG/CX/語学
  { label: "進行管理",              cat: "プロジェクトマネジメント" },
  { label: "チームマネジメント",    cat: "プロジェクトマネジメント" },
  { label: "アジャイル開発管理",     cat: "プロジェクトマネジメント" },
  { label: "プレゼンテーション",     cat: "コミュニケーション・プレゼン" },
  { label: "ファシリテーション",     cat: "コミュニケーション・プレゼン" },
  { label: "社内研修講師",           cat: "教育・研修" },
  { label: "外部セミナー登壇",       cat: "教育・研修" },
  { label: "市場調査・競合分析",     cat: "リサーチ・分析" },
  { label: "ユーザーインタビュー",   cat: "リサーチ・分析" },
  { label: "Webマーケティング",      cat: "マーケティング" },
  { label: "SEO・SNS運用",           cat: "マーケティング" },
  { label: "広告運用(Google/Facebook)", cat: "マーケティング" },
  { label: "契約・建築法務",         cat: "法務・コンプライアンス" },
  { label: "都市計画法/建築基準法",  cat: "法務・コンプライアンス" },
  { label: "ESGレポート作成",        cat: "サステナビリティ/ESG" },
  { label: "環境配慮設計",           cat: "サステナビリティ/ESG" },
  { label: "顧客満足度分析",         cat: "顧客対応・CX" },
  { label: "カスタマーサクセス運用",  cat: "顧客対応・CX" },
  { label: "英語業務対応",           cat: "語学" },
  { label: "ビジネス英語メール",     cat: "語学" },
] as const;

/* ========= 各ステージの固定スコア（棒グラフ） ========= */
// 高校
const levelsHighschool: ToolLevelTable = {
  "AutoCAD": 0, "SketchUp": 0, "Rhino + Grasshopper": 0, "Twinmotion": 0, "Lumion": 0,
  "Adobe Illustrator": 0, "Adobe Photoshop": 1, "Inkscape": 0, "Blender": 0, "DaVinci Resolve": 0,
  "ArcGIS": 0, "QGIS": 0, "Kepler.gl": 0,
  "Python": 0, "JavaScript / TypeScript": 0, "Node.js": 0, "Pandas": 0, "NumPy": 0,
  "生成AI活用": 0, "AIアプリ制作": 0, "業務自動化（Python+Excel）": 0, "ダッシュボード試作（Kepler/BI）": 0,
  "Excel": 0, "PowerPoint": 2,
  "土地仕入・ボリューム検討": 0, "事業収支/DCF（Excel）": 0, "不動産証券化の基礎": 0,
  "DCF/NPV・IRR": 0, "LTV/DSCR": 0,
  "進行管理": 0, "チームマネジメント": 0, "アジャイル開発管理": 0,
  "プレゼンテーション": 2, "ファシリテーション": 2,
  "社内研修講師": 0, "外部セミナー登壇": 0,
  "市場調査・競合分析": 0, "ユーザーインタビュー": 0,
  "Webマーケティング": 0, "SEO・SNS運用": 0, "広告運用(Google/Facebook)": 0,
  "契約・建築法務": 0, "都市計画法/建築基準法": 0,
  "ESGレポート作成": 0, "環境配慮設計": 0,
  "顧客満足度分析": 0, "カスタマーサクセス運用": 0,
  "英語業務対応": 0, "ビジネス英語メール": 0,
};

// 大学
const levelsUniversity: ToolLevelTable = {
  "AutoCAD": 3, "SketchUp": 5, "Rhino + Grasshopper": 5, "Twinmotion": 5, "Lumion": 2,
  "Adobe Illustrator": 5, "Adobe Photoshop": 3, "Inkscape": 0, "Blender": 0, "DaVinci Resolve": 0,
  "ArcGIS": 3, "QGIS": 3, "Kepler.gl": 0,
  "Python": 2, "JavaScript / TypeScript": 1, "Node.js": 0, "Pandas": 0, "NumPy": 0,
  "生成AI活用": 0, "AIアプリ制作": 0, "業務自動化（Python+Excel）": 0, "ダッシュボード試作（Kepler/BI）": 0,
  "Excel": 3, "PowerPoint": 3,
  "土地仕入・ボリューム検討": 0, "事業収支/DCF（Excel）": 0, "不動産証券化の基礎": 0,
  "DCF/NPV・IRR": 0, "LTV/DSCR": 0,
  "進行管理": 1, "チームマネジメント": 2, "アジャイル開発管理": 0,
  "プレゼンテーション": 3, "ファシリテーション": 3,
  "社内研修講師": 0, "外部セミナー登壇": 0,
  "市場調査・競合分析": 1, "ユーザーインタビュー": 1,
  "Webマーケティング": 1, "SEO・SNS運用": 0, "広告運用(Google/Facebook)": 0,
  "契約・建築法務": 0, "都市計画法/建築基準法": 1,
  "ESGレポート作成": 0, "環境配慮設計": 0,
  "顧客満足度分析": 0, "カスタマーサクセス運用": 0,
  "英語業務対応": 1, "ビジネス英語メール": 1,
};

// 大学院
const levelsGraduate: ToolLevelTable = {
  "AutoCAD": 3, "SketchUp": 4, "Rhino + Grasshopper": 4, "Twinmotion": 4, "Lumion": 2,
  "Adobe Illustrator": 5, "Adobe Photoshop": 3, "Inkscape": 0, "Blender": 0, "DaVinci Resolve": 0,
  "ArcGIS": 4, "QGIS": 4, "Kepler.gl": 4,
  "Python": 2, "JavaScript / TypeScript": 1, "Node.js": 0, "Pandas": 0, "NumPy": 0,
  "生成AI活用": 1, "AIアプリ制作": 0, "業務自動化（Python+Excel）": 0, "ダッシュボード試作（Kepler/BI）": 0,
  "Excel": 4, "PowerPoint": 4,
  "土地仕入・ボリューム検討": 0, "事業収支/DCF（Excel）": 0, "不動産証券化の基礎": 0,
  "DCF/NPV・IRR": 0, "LTV/DSCR": 0,
  "進行管理": 1, "チームマネジメント": 3, "アジャイル開発管理": 0,
  "プレゼンテーション": 4, "ファシリテーション": 3,
  "社内研修講師": 0, "外部セミナー登壇": 0,
  "市場調査・競合分析": 1, "ユーザーインタビュー": 1,
  "Webマーケティング": 1, "SEO・SNS運用": 0, "広告運用(Google/Facebook)": 0,
  "契約・建築法務": 0, "都市計画法/建築基準法": 2,
  "ESGレポート作成": 0, "環境配慮設計": 0,
  "顧客満足度分析": 0, "カスタマーサクセス運用": 0,
  "英語業務対応": 2, "ビジネス英語メール": 2,
};

// 現在
const levelsCurrent: ToolLevelTable = {
  "AutoCAD": 3, "SketchUp": 4, "Rhino + Grasshopper": 3, "Twinmotion": 3, "Lumion": 2,
  "Adobe Illustrator": 5, "Adobe Photoshop": 4, "Inkscape": 3, "Blender": 0, "DaVinci Resolve": 2,
  "ArcGIS": 3, "QGIS": 4, "Kepler.gl": 5,
  "Python": 2, "JavaScript / TypeScript": 3, "Node.js": 1, "Pandas": 1, "NumPy": 1,
  "生成AI活用": 5, "AIアプリ制作": 4, "業務自動化（Python+Excel）": 4, "ダッシュボード試作（Kepler/BI）": 4,
  "Excel": 5, "PowerPoint": 4,
  "土地仕入・ボリューム検討": 4, "事業収支/DCF（Excel）": 4, "不動産証券化の基礎": 4,
  "DCF/NPV・IRR": 4, "LTV/DSCR": 2,
  "進行管理": 3, "チームマネジメント": 3, "アジャイル開発管理": 0,
  "プレゼンテーション": 4, "ファシリテーション": 3,
  "社内研修講師": 4, "外部セミナー登壇": 0,
  "市場調査・競合分析": 3, "ユーザーインタビュー": 1,
  "Webマーケティング": 1, "SEO・SNS運用": 3, "広告運用(Google/Facebook)": 0,
  "契約・建築法務": 1, "都市計画法/建築基準法": 3,
  "ESGレポート作成": 0, "環境配慮設計": 0,
  "顧客満足度分析": 0, "カスタマーサクセス運用": 0,
  "英語業務対応": 1, "ビジネス英語メール": 2,
};

// 未来（目標値）
const levelsFuture: ToolLevelTable = {
  // 現在より一段上を目標にした例。自由に調整してOK。
  "AutoCAD": 3, "SketchUp": 4, "Rhino + Grasshopper": 5, "Twinmotion": 3, "Lumion": 4,
  "Adobe Illustrator": 5, "Adobe Photoshop": 4, "Inkscape": 3, "Blender": 5, "DaVinci Resolve": 5,
  "ArcGIS": 3, "QGIS": 4, "Kepler.gl": 5,
  "Python": 4, "JavaScript / TypeScript": 4, "Node.js": 4, "Pandas": 4, "NumPy": 4,
  "生成AI活用": 5, "AIアプリ制作": 5, "業務自動化（Python+Excel）": 5, "ダッシュボード試作（Kepler/BI）": 4,
  "Excel": 5, "PowerPoint": 5,
  "土地仕入・ボリューム検討": 5, "事業収支/DCF（Excel）": 5, "不動産証券化の基礎": 4,
  "DCF/NPV・IRR": 4, "LTV/DSCR": 4,
  "進行管理": 3, "チームマネジメント": 3, "アジャイル開発管理": 0,
  "プレゼンテーション": 5, "ファシリテーション": 5,
  "社内研修講師": 4, "外部セミナー登壇": 3,
  "市場調査・競合分析": 3, "ユーザーインタビュー": 3,
  "Webマーケティング": 5, "SEO・SNS運用": 5, "広告運用(Google/Facebook)": 5,
  "契約・建築法務": 5, "都市計画法/建築基準法": 5,
  "ESGレポート作成": 2, "環境配慮設計": 3,
  "顧客満足度分析": 4, "カスタマーサクセス運用": 4,
  "英語業務対応": 5, "ビジネス英語メール": 5,
};

/* ========= レーダー（各ステージ固定値; future は“目標”値） ========= */
const categoriesHighschool: SkillCategory[] = [
  { key: "architecture",  label: "建築・設計", current: 1 },
  { key: "design",        label: "デザイン",   current: 1 },
  { key: "gis",           label: "GIS・可視化",current: 0 },
  { key: "data",          label: "データ分析", current: 1 },
  { key: "dx",            label: "DX/自動化",  current: 0 },
  { key: "programming",   label: "プログラミング", current: 1 },
  { key: "office",        label: "office365",  current: 3 },
  { key: "pm",            label: "プロジェクトマネジメント", current: 1 },
  { key: "communication", label: "コミュニケーション・プレゼン", current: 2 },
  { key: "research",      label: "リサーチ・分析", current: 1 },
  { key: "marketing",     label: "マーケティング", current: 1 },
  { key: "language",      label: "語学",       current: 0 },
  { key: "realestate",    label: "不動産",     current: 0 },
  { key: "finance",       label: "金融",       current: 0 },
  { key: "legal",         label: "法務・コンプライアンス", current: 0 },
  { key: "sustainability",label: "サステナビリティ/ESG", current: 0 },
  { key: "customer",      label: "顧客対応・CX", current: 0 },
  { key: "education",     label: "教育・研修", current: 2 },
];

const categoriesUniversity: SkillCategory[] = [
  { key: "architecture",  label: "建築・設計", current: 5 },
  { key: "design",        label: "デザイン",   current: 5 },
  { key: "gis",           label: "GIS・可視化",current: 3 },
  { key: "data",          label: "データ分析", current: 4 },
  { key: "dx",            label: "DX/自動化",  current: 2 },
  { key: "programming",   label: "プログラミング", current: 2 },
  { key: "office",        label: "office365",  current: 5 },
  { key: "pm",            label: "プロジェクトマネジメント", current: 3 },
  { key: "communication", label: "コミュニケーション・プレゼン", current: 5 },
  { key: "research",      label: "リサーチ・分析", current: 5 },
  { key: "marketing",     label: "マーケティング", current: 2 },
  { key: "language",      label: "語学",       current: 2 },
  { key: "realestate",    label: "不動産",     current: 0 },
  { key: "finance",       label: "金融",       current: 0 },
  { key: "legal",         label: "法務・コンプライアンス", current: 1 },
  { key: "sustainability",label: "サステナビリティ/ESG", current: 3 },
  { key: "customer",      label: "顧客対応・CX", current: 1 },
  { key: "education",     label: "教育・研修", current: 5 },
];

const categoriesGraduate: SkillCategory[] = [
  { key: "architecture",  label: "建築・設計", current: 7 },
  { key: "design",        label: "デザイン",   current: 6 },
  { key: "gis",           label: "GIS・可視化",current: 6 },
  { key: "data",          label: "データ分析", current: 3 },
  { key: "dx",            label: "DX/自動化",  current: 3 },
  { key: "programming",   label: "プログラミング", current: 3 },
  { key: "office",        label: "office365",  current: 7 },
  { key: "pm",            label: "プロジェクトマネジメント", current: 4 },
  { key: "communication", label: "コミュニケーション・プレゼン", current: 4 },
  { key: "research",      label: "リサーチ・分析", current: 4 },
  { key: "marketing",     label: "マーケティング", current: 3 },
  { key: "language",      label: "語学",       current: 3 },
  { key: "realestate",    label: "不動産",     current: 2 },
  { key: "finance",       label: "金融",       current: 2 },
  { key: "legal",         label: "法務・コンプライアンス", current: 2 },
  { key: "sustainability",label: "サステナビリティ/ESG", current: 5 },
  { key: "customer",      label: "顧客対応・CX", current: 1 },
  { key: "education",     label: "教育・研修", current: 3 },
];

// 現在の相対評価。実務を主担当として進めた領域を上位に置き、
// 研究・公開制作、限定した範囲での実務、学習・経験の浅い領域を分けている。
const categoriesCurrent: SkillCategory[] = [
  { key: "architecture",  label: "建築・設計", current: 7 },
  { key: "design",        label: "デザイン",   current: 7 },
  { key: "gis",           label: "GIS・可視化",current: 8 },
  { key: "data",          label: "データ分析", current: 7 },
  { key: "dx",            label: "DX/自動化",  current: 9 },
  { key: "programming",   label: "プログラミング", current: 6 },
  { key: "office",        label: "office365",  current: 8 },
  { key: "pm",            label: "プロジェクトマネジメント", current: 6 },
  { key: "communication", label: "コミュニケーション・プレゼン", current: 7 },
  { key: "research",      label: "リサーチ・分析", current: 8 },
  { key: "marketing",     label: "マーケティング", current: 4 },
  { key: "language",      label: "語学",       current: 2 },
  { key: "realestate",    label: "不動産",     current: 9},
  { key: "finance",       label: "金融",       current: 5 },
  { key: "legal",         label: "法務・コンプライアンス", current: 3 },
  { key: "sustainability",label: "サステナビリティ/ESG", current: 2 },
  { key: "customer",      label: "顧客対応・CX", current: 1 },
  { key: "education",     label: "教育・研修", current: 6 },
];

// 未来（目標値）— レーダーの“伸びしろ”として参照される
const categoriesFuture: SkillCategory[] = [
  { key: "architecture",  label: "建築・設計", current: 10 },
  { key: "design",        label: "デザイン",   current: 10 },
  { key: "gis",           label: "GIS・可視化",current: 8 },
  { key: "data",          label: "データ分析", current: 9 },
  { key: "dx",            label: "DX/自動化",  current: 10 },
  { key: "programming",   label: "プログラミング", current: 8 },
  { key: "office",        label: "office365",  current: 8 },
  { key: "pm",            label: "プロジェクトマネジメント", current: 8 },
  { key: "communication", label: "コミュニケーション・プレゼン", current: 9 },
  { key: "research",      label: "リサーチ・分析", current: 8 },
  { key: "marketing",     label: "マーケティング", current: 8 },
  { key: "language",      label: "語学",       current: 10 },
  { key: "realestate",    label: "不動産",     current: 9},
  { key: "finance",       label: "金融",       current: 9 },
  { key: "legal",         label: "法務・コンプライアンス", current: 6 },
  { key: "sustainability",label: "サステナビリティ/ESG", current: 6 },
  { key: "customer",      label: "顧客対応・CX", current: 7 },
  { key: "education",     label: "教育・研修", current: 8 },
];

/* ========= ヘルパ ========= */
function buildTools(levels: ToolLevelTable): SkillTool[] {
  return toolsMeta.map((m) => ({
    ...m,
    level: Math.max(0, Math.min(5, levels[m.label] ?? 0)),
  }));
}

/* ========= ステージ定義 ========= */
export const skillsByStage: Record<StageKey, StageSkillData> = {
  highschool: { categories: categoriesHighschool, tools: buildTools(levelsHighschool) },
  university: { categories: categoriesUniversity, tools: buildTools(levelsUniversity) },
  graduate:   { categories: categoriesGraduate,   tools: buildTools(levelsGraduate) },
  current:    { categories: categoriesCurrent,    tools: buildTools(levelsCurrent) },
  future:     { categories: categoriesFuture,     tools: buildTools(levelsFuture) }, // ← NEW
};
