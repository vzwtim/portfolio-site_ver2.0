// /src/app/about/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import SkillsChart from "@/components/SkillsChart";
import { skillsByStage, type StageKey } from "@/data/skills";
import BackgroundImageSlideshow from '@/components/BackgroundImageSlideshow';
import styles from './about.module.css';

const journeyData = [
  { year: "1999 – 2018", event_jp: "仙台で育つ", event_en: "Birthplace", details_jp: "熊鹿がたまに出るような団地の山際でのんびり成長する。", details_en: "I grew up leisurely on the edge of a mountain in a housing complex where bears and deer sometimes appeared.", image: "/images/me_mountain_1.jpg" },
  { year: "2015 – 2018", event_jp: "仙台第二高等学校", event_en: "High School", details_jp: "中高ではテニス部に所属。休み時間はゲームするような少しオタク。", details_en: "I was in the tennis club in middle and high school. During breaks, I was a bit of a geek who played games.", image: "/images/me_tennis_1.JPG" },
  { year: "2018 – 2022", event_jp: "東京大学 工学部 建築学科", titleParts: ["東京大学", "工学部 建築学科"], event_en: "University", details_jp: "ものづくり、建築から不良住宅や住環境に関心が広がり、社会にインパクトを与えるアイデアを思考し続ける。", details_en: "My interest expanded from craftsmanship and architecture to substandard housing and living environments, and I continue to think about ideas that have a social impact.", image: "/images/drawing_aris.jpg" },
  { year: "2022 – 2024", event_jp: "東京大学大学院 新領域創成科学研究科 社会文化環境学専攻", titleParts: ["東京大学大学院", "新領域創成科学研究科", "社会文化環境学専攻"], event_en: "Graduate School", details_jp: "社会・環境・人類学などへ関心を広げ、「まちはつくるものか、できてくるものか」を問い続ける。", details_en: "I expanded my interests to sociology, the environment, and anthropology, and continue to ask, 'Are cities made, or do they just happen?'", image: "/images/figure_master.webp" },
  { year: "2024 – Present", event_jp: "不動産デベロッパー", event_en: "Career", details_jp: "用地取得・企画開発、保有賃貸不動産のAM、SPCへのエクイティ出資に従事。\nまた、経営企画にて組織風土改善PJに参画、DX勉強会を立ち上げるなど、会社の仕組みや意思決定プロセスへの関心を深めている。", details_en: "Engaged in land acquisition, project planning, asset management of rental properties, and equity investment in special purpose companies.\nAlso, I am deepening my interest in company structures and decision-making processes by participating in a corporate culture reform project and launching a DX study group in the corporate planning department.", image: "/images/building_osaka.jpg" },
  { year: "Future", event_jp: "事業開発・経営", event_en: "Business Development & Management", details_jp: "新規事業の構想・検証から、事業を育てる意思決定と実行まで。組織や事業の課題を見極め、仕組みと現場をつなぎながら、事業を動かし、育てる側に関わりたい。", details_en: "I want to build and grow businesses, from testing new ideas to making decisions and putting them into practice. My interest lies in connecting strategy, organizational systems, and daily operations to help a business develop.", isFuture: true },
  { year: "Future", event_jp: "ホテル開発", event_en: "Hotel Development", details_jp: "旧街道を自転車で巡るなかで、宿場町の建物や土地の歴史に惹かれてきた。街道沿いの風景や暮らしを受け継ぎ、地域の日常と旅人が交わる場を、ホテルとして形にしたい。", details_en: "Cycling historic roads has deepened my interest in post towns, their buildings, and local histories. I want to develop hotels that carry these landscapes and ways of life forward, bringing travelers and local communities together.", isFuture: true },
  { year: "Future", event_jp: "投資・金融", event_en: "Investment & Finance", details_jp: "不動産投資・エクイティ出資を入口に、企業投資やVCにも関心を広げている。事業モデルや成長可能性を見極め、資本と経営支援を通じて、企業や事業が育つ過程に関わりたい。", details_en: "Building on real estate and equity investment, my interests extend to corporate investment and venture capital: understanding business models and growth potential, and helping companies develop through capital and management support.", isFuture: true },
];

const STAGES: { key: StageKey; label: string }[] = [
  { key: "highschool", label: "高校" },
  { key: "university", label: "大学" },
  { key: "graduate",   label: "大学院" },
  { key: "current",    label: "現在" },
  { key: "future",     label: "未来" },
];

const TimelineItem = ({ item, isLast }: { item: typeof journeyData[0], isLast: boolean }) => (
  <motion.div
    className="relative pl-12 pb-12"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    {!isLast && <div className="absolute left-[18px] top-5 h-full w-0.5 bg-gray-200"></div>}
    <div className={`absolute left-3 top-1 h-5 w-5 rounded-full border-4 border-white ${item.isFuture ? 'bg-[#bb5555]' : 'bg-[#008877]'}`}></div>
    <div className={`md:grid items-start ${item.image ? 'md:grid-cols-3 md:gap-8' : 'md:grid-cols-1'}`}>
        <div className={item.image ? 'md:col-span-2 mb-4 md:mb-0' : ''}>
            <p className="text-sm text-gray-500 mb-1">{item.year}</p>
            <h3 className={`text-xl font-bold text-gray-900 ${styles.timelineTitle}`}>{(item.titleParts ?? [item.event_jp]).map(part => <span key={part}>{part}</span>)}</h3>
            <p lang="en" className={`text-gray-500 text-base ${styles.timelineEnglish}`}>{item.event_en}</p>
            <div className="mt-3">
              <p className={`text-gray-700 whitespace-pre-line leading-relaxed ${styles.copy}`}>{item.details_jp}</p>
              <p lang="en" className={`text-gray-500 mt-2 whitespace-pre-line text-sm leading-relaxed ${styles.copy}`}>{item.details_en}</p>
            </div>
        </div>
        {item.image && (
            <motion.div
              data-hover-image
              className="w-full h-40 md:h-full relative flex-shrink-0 overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Image src={item.image} alt={item.event_jp} fill style={{objectFit: 'cover'}} className="rounded-lg shadow-md" />
            </motion.div>
        )}
    </div>
  </motion.div>
);

export default function About() {
  const [stage, setStage] = useState<StageKey>("current");

  return (
    <>
      <BackgroundImageSlideshow />

      <main>
        {/* Opening Section */}
        <section
          className="relative min-h-svh py-24 flex flex-col items-center justify-center text-center text-white"
        >
          <div className="relative z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full max-w-xs md:max-w-sm relative mx-auto mb-8">
                <Image src="/images/babayudai_logo.svg" alt="YUDAI Logo" width={500} height={500} className="object-contain" quality={90} priority />
              </div>
              <div className="max-w-3xl mx-auto">
                <div className={`text-base md:text-lg text-gray-100 mb-4 ${styles.introJapanese}`}>
                  <p><span>建築・社会学を専攻し、</span><span>いまは不動産開発をしています。</span></p>
                  <p><span>東京を歩き、建築を考えながら、</span><span>旧耐震の和室で</span><span>ちゃぶ台を前に暮らしています。</span></p>
                </div>
                <p lang="en" className={`text-sm md:text-base text-gray-400 ${styles.introEnglish}`}>
                  I majored in architecture and sociology, and now I work in real estate development.
                  I live in a pre-earthquake-code Japanese-style room in Tokyo, in front of a low dining table, while walking around the city and thinking about architecture.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other sections on white background */}
        <div className="relative bg-white text-gray-800">
          <div className="max-w-5xl mx-auto pt-24 md:pt-32 pb-24 md:pb-32 px-4 md:px-8">
            
            <section className="mb-24 md:mb-32">
              <motion.h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16 text-center text-gray-900" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}>
                Journey
              </motion.h2>
              <div className="relative">
                {journeyData.map((item, index) => (
                  <TimelineItem key={index} item={item} isLast={index === journeyData.length - 1} />
                ))}
              </div>
            </section>

            <section id="skills" className="mb-24 scroll-mt-24 md:mb-32">
              <motion.h2 className="font-display text-4xl md:text-5xl font-extrabold mb-7 text-center text-gray-900" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}>
                Skills
              </motion.h2>
              <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mb-4">
                {STAGES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setStage(key)}
                    className={`min-h-11 px-2.5 text-sm font-medium underline-offset-8 transition-colors ${
                      stage === key
                        ? "text-[#006b59] underline decoration-2"
                        : "text-gray-600 hover:text-[#006b59]"
                    }`}
                    aria-pressed={stage === key}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <SkillsChart stageData={skillsByStage[stage]} />
            </section>

            <section className="text-center">
              <div className="max-w-2xl mx-auto">
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
