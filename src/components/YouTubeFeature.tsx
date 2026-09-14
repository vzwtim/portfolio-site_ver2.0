"use client";

import Link from "next/link";
import styles from "@/app/refresh.module.css";

interface YouTubeFeatureProps {
  videoId: string;
  title?: string;
  channelUrl: string;
  uploadsHandle: string;
}

export default function YouTubeFeature({ videoId, channelUrl, uploadsHandle, title = "旧街道を、自転車でたどる。" }: YouTubeFeatureProps) {
  const featuredSource = `https://www.youtube-nocookie.com/embed/${videoId}?start=2&rel=0`;
  const uploadsSource = `https://www.youtube-nocookie.com/embed?listType=user_uploads&list=${encodeURIComponent(uploadsHandle)}&rel=0`;

  return (
    <section className={styles.videoFeature} aria-labelledby="video-feature-title" data-reveal="copy">
      <header className={styles.videoFeatureHeader}>
        <div>
          <p className={styles.meta}>YouTube / Video journal</p>
          <h3 id="video-feature-title">移動の記録を、映像で。</h3>
        </div>
        <p>横にスクロールして、特集映像とチャンネルの動画を選べます。</p>
      </header>

      <div className={styles.videoRail} aria-label="動画セレクション">
        <article className={styles.videoCard}>
          <div className={styles.videoFrame}>
            <iframe src={featuredSource} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
          </div>
          <div className={styles.videoCardCopy}><span>01 / Featured film</span><h4>{title}</h4><p>経路と風景、寄り道を一本の時間軸で編集した記録。</p></div>
        </article>

        <article className={styles.videoCard}>
          <div className={styles.videoFrame}>
            <iframe src={uploadsSource} title={`@${uploadsHandle} のアップロード動画`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
          </div>
          <div className={styles.videoCardCopy}><span>02 / Channel selection</span><h4>チャンネルの映像を選ぶ</h4><p>プレイヤーの再生リストから、ほかのフィールドノートへ。</p></div>
        </article>
      </div>

      <Link className={styles.youtubeLink} href={channelUrl} target="_blank" rel="noopener noreferrer">@{uploadsHandle} のチャンネルへ&nbsp; ↗</Link>
    </section>
  );
}
