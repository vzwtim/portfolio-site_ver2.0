"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "@/app/refresh.module.css";

interface YouTubeFeatureProps {
  videoId?: string;
  title?: string;
  channelUrl: string;
  uploadsHandle: string;
}

export default function YouTubeFeature({ videoId, channelUrl, uploadsHandle, title = "旧街道を、自転車でたどる。" }: YouTubeFeatureProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const embedSource = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : `https://www.youtube-nocookie.com/embed?listType=user_uploads&list=${encodeURIComponent(uploadsHandle)}`;
  return (
    <article className={styles.videoFeature} aria-label="YouTubeで展開する旅の記録">
      <div className={styles.videoFrame}>
        {isLoaded ? <iframe src={embedSource} title={`${title} — @${uploadsHandle}`} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <button className={styles.videoActivator} type="button" onClick={() => setIsLoaded(true)} aria-label={`${title}をYouTube埋め込みで開く`}><Image src="/images/trip_tokaido_1.jpg" alt="" fill sizes="(max-width:760px) 100vw, 66vw" /><span>PLAY VIDEO ↗</span></button>}
      </div>
      <div className={styles.videoCopy}><p className={styles.meta}>YouTube / Field notes</p><h3>{title}</h3><p>経路と風景、寄り道を一本の時間軸で編集するVideo Journal。</p><Link className={styles.youtubeLink} href={channelUrl} target="_blank" rel="noopener noreferrer">@{uploadsHandle} をYouTubeで見る&nbsp; ↗</Link></div>
    </article>
  );
}
