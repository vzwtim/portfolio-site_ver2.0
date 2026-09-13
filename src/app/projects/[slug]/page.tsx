import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hotelProject } from "@/data/featuredProjects";
import styles from "../../refresh.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return [{ slug: hotelProject.slug }]; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== hotelProject.slug) return {};
  return { title: `${hotelProject.shortTitle} | ぼくは五目飯`, description: hotelProject.synopsis };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== hotelProject.slug) notFound();
  return (
    <main className={styles.page}>
      <article className={styles.section} style={{ paddingTop: "clamp(8rem, 15vw, 12rem)" }}>
        <Link href="/" className={styles.textLink}>← Indexへ戻る</Link>
        <p className={styles.eyebrow} style={{ marginTop: "4rem" }}>{hotelProject.domain} / {hotelProject.index}</p>
        <h1 className={styles.caseTitle}>{hotelProject.title}</h1>
        <p className={styles.body}>{hotelProject.synopsis}</p>
        <dl className={styles.facts} style={{ marginTop: "4rem" }}>
          <div className={styles.fact}><dt>ROLE / 担当</dt><dd>{hotelProject.roleSummary}</dd></div>
          <div className={styles.fact}><dt>PERIOD / 期間</dt><dd>{hotelProject.periodLabel}</dd></div>
          <div className={styles.fact}><dt>STATUS / 状態</dt><dd>{hotelProject.statusLabel}</dd></div>
          <div className={styles.fact}><dt>RESULT / 結果</dt><dd>{hotelProject.resultOrProgress}</dd></div>
        </dl>
      </article>

      <section className={`${styles.section} ${styles.noteStrip}`}>
        <div><p className={styles.eyebrow}>01 / Context</p><h2 className={styles.noteTitle}>住宅のものさしを、<br />ホテルへ置き換える。</h2></div>
        <div className={styles.noteCopy}>
          <p>住宅・オフィスを中心としてきた会社にとって、ホテルは運営収益まで見なければ判断できない初めてのアセットでした。</p>
          <p>複数の外部オペレーターから得た条件を同じ土俵で比較できるよう、住宅に近かった従来の収支構造をホテル事業向けに再構成しました。</p>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHead}><h2 className={styles.sectionTitle}>Decision</h2><p className={styles.meta}>How the scheme was chosen</p></header>
        <div className={styles.caseGrid}>
          <h3 className={styles.caseTitle}>収益だけでなく、<br />リスクと次の展開を見る。</h3>
          <div className={styles.body}>
            <p>運営委託、運営会社を自社で持つ方法、賃貸借方式などを比較。リスクの持ち方と今後の事業展開を踏まえ、外部オペレーターとの定期建物賃貸借方式を選びました。</p>
            <p>先行して提案した別案件は承認に至りませんでした。その経験も踏まえて収支と社内資料を整え、本件では意思決定を経て取得まで進めました。</p>
          </div>
        </div>
      </section>

      <aside className={styles.section} style={{ borderTop: "1px solid #111311" }}>
        <p className={styles.meta}>SCOPE NOTE</p>
        <p className={styles.body}>契約に伴う詳細実務は上司が担当しました。また、売却と保有不動産のポートフォリオ分析は別案件であり、このホテル案件の成果には含めていません。</p>
      </aside>
    </main>
  );
}
