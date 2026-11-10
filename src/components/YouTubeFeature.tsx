"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import films from "@/data/films.json";
import styles from "@/app/refresh.module.css";
interface YouTubeFeatureProps { videoId:string; title?:string; channelUrl:string; uploadsHandle:string; }
export default function YouTubeFeature({videoId,channelUrl,uploadsHandle,title="旧街道を、自転車でたどる。"}:YouTubeFeatureProps) {
 const [activeId,setActiveId]=useState(videoId);
 const selection=[...films].sort((a,b)=>Number(b.id===videoId)-Number(a.id===videoId));
 return <section className={styles.videoFeature} aria-labelledby="video-feature-title" data-reveal="copy">
  <header className={styles.videoFeatureHeader}><div><p className={styles.meta}>YouTube / Video journal</p><h3 id="video-feature-title">道をたどり、風景を残す。</h3></div><p>旧街道を自転車で走り、街の変化や寄り道を映像に。6本の記録を、横に送って選べます。</p></header>
  <div className={styles.videoRail} data-lenis-prevent aria-label="動画セレクション">{selection.map((film,index)=><article className={styles.videoCard} key={film.id}>
   <div className={styles.videoFrame}>{activeId===film.id?<iframe key={film.id} src={`https://www.youtube-nocookie.com/embed/${film.id}?start=2&rel=0${film.id!==videoId?'&autoplay=1':''}`} title={film.id===videoId?title:film.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy"/>:<button type="button" className={styles.filmPlay} onClick={()=>setActiveId(film.id)} aria-label={`${film.title}を再生`}><Image src={film.thumbnail} alt="" fill quality={90} sizes="(max-width:760px) 90vw, 512px"/><span aria-hidden="true">▶</span><span className={styles.filmPlayLabel}>このページで再生</span></button>}</div>
   <div className={styles.videoCardCopy}><span>{String(index+1).padStart(2,'0')} / Field film</span><h4>{film.title}</h4><Link href={`https://www.youtube.com/watch?v=${film.id}`} target="_blank" rel="noopener noreferrer" className={styles.filmExternal}>YouTubeで見る ↗</Link></div>
  </article>)}<article className={styles.videoCard}><div className={styles.videoFrame}><Link className={styles.channelPreview} href={channelUrl} target="_blank" rel="noopener noreferrer"><Image src="/images/trip_tokaido_2.jpg" alt="" fill sizes="(max-width:760px) 90vw, 512px"/><span>@{uploadsHandle} の映像を見る</span></Link></div><div className={styles.videoCardCopy}><span>More / Channel</span><h4>ほかの街道の記録へ</h4></div></article></div>
  <Link className={styles.youtubeLink} href={channelUrl} target="_blank" rel="noopener noreferrer">@{uploadsHandle} のチャンネルへ ↗</Link>
 </section>;
}
