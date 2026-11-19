export interface ProjectContext {
  period?: string;
  stage: string;
  activity: string;
}

// Broad stages are intentional where an exact production year is not recorded.
// Calendar years describe the work, not the date it was added to this portfolio.
export const projectContexts: Record<string, ProjectContext> = {
  "hotel-underwriting": { stage: "社会人期", activity: "仕事" },
  "openboard-table": { period: "2026", stage: "社会人3年目", activity: "個人制作" },
  "tokyo-time-warp": { period: "2026", stage: "社会人3年目", activity: "個人制作" },
  "tile-atelier": { period: "2026", stage: "社会人3年目", activity: "個人制作" },
  "isshu-map": { period: "2026", stage: "社会人3年目", activity: "個人制作" },
  "internal-dx-workshop": { period: "2025.07〜", stage: "社会人2年目〜", activity: "仕事・自主企画" },
  "competition-mentor-support": { period: "2026.07〜", stage: "社会人3年目〜", activity: "社外活動・業務委託" },
  "company-culture-club": { stage: "社会人期", activity: "社内活動・自主企画" },
  "organizational-culture-reform": { stage: "社会人1年目〜", activity: "仕事・社内PJ" },
  "realestate-map2": { stage: "社会人期", activity: "地図制作" },
  "realestate-map1": { stage: "社会人期", activity: "地図制作" },
  "gomoku-rice": { stage: "日常", activity: "プライベート" },
  "mokumoku-pj": { period: "2024", stage: "社会人1年目", activity: "仕事・新入社員研修" },
  "master-thesis": { stage: "大学院", activity: "修士研究" },
  "bachelor-thesis": { period: "2021年度", stage: "大学4年", activity: "卒業研究" },
  "sanriku-coast": { stage: "学生時代", activity: "調査・フィールドワーク" },
  "odo-renovation": { stage: "学生時代", activity: "改修実践" },
  "odo-campsite": { stage: "学生時代", activity: "調査・設計" },
  "ogawamachi-water-2": { stage: "学生時代", activity: "調査・フィールドワーク" },
  "ogawamachi-water": { stage: "学生時代", activity: "調査・ワークショップ" },
  "plantbuilding-concept": { stage: "制作時期未確認", activity: "建築構想" },
  "kosuge-house": { stage: "大学時代", activity: "学業・設計" },
  "ginza-kk-park": { stage: "大学時代", activity: "学業・設計" },
  "nishiogi-crane": { stage: "大学時代", activity: "学業・設計" },
  "aris-library": { stage: "大学時代", activity: "学業・設計" },
  "pavilion-mayfes": { stage: "大学時代", activity: "学生プロジェクト" },
  "membrane-toilet": { stage: "大学時代", activity: "学業・設計" },
  "kagurazaka-cinema": { stage: "大学時代", activity: "学業・設計" },
  "tama-housing": { stage: "大学時代", activity: "学業・設計" },
  "studyflow": { stage: "社会人期", activity: "個人制作" },
  "drunk-scheduler": { stage: "社会人期", activity: "個人制作" },
  "multi-ai-chat": { stage: "社会人期", activity: "個人制作" },
  "prop-proposals": { stage: "社会人期", activity: "自主制作" },
  "shuffle-lunch": { stage: "社会人期", activity: "社内ツール制作" },
  "portfolio-site-v1": { stage: "社会人期", activity: "個人制作" },
};
