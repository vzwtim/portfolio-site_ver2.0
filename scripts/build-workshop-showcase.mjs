import fs from 'node:fs/promises';
import sharp from 'sharp';
// Compose exact screenshots; never redraw the participants' interfaces.
const entries=[['dandoly','Dandoly','タスク管理ツール'],['dx-estate','DX不動産','不動産売却LP'],['liveflow','LiveFlow & Poll','投票・コメントツール']];
const cards=await Promise.all(entries.map(async ([name,title,kind],i)=>{
 const src=await sharp(`materials/digicafe/${name}.png`).resize(1000,700,{fit:'contain',background:'#ffffff'}).png().toBuffer();
 const x=64+i*576;
 return `<g transform="translate(${x} 230)"><rect width="544" height="540" rx="12" fill="#fff"/><rect x="0" y="0" width="544" height="32" rx="12" fill="#e5e9e5"/><circle cx="17" cy="16" r="4" fill="#bd7770"/><circle cx="31" cy="16" r="4" fill="#d7bc82"/><circle cx="45" cy="16" r="4" fill="#7fada0"/><image href="data:image/png;base64,${src.toString('base64')}" x="12" y="40" width="520" height="364"/><text x="24" y="455" font-size="28" font-weight="600">${title.replaceAll('&','&amp;')}</text><text x="24" y="493" font-size="20" fill="#5b6b64">${kind}</text></g>`;
}));
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1840" height="920" viewBox="0 0 1840 920"><rect width="1840" height="920" fill="#e8eee7"/><g font-family="Noto Sans CJK JP, sans-serif" fill="#183e34"><text x="64" y="80" font-size="18" letter-spacing="4">DIGICAFE / DIGILAB — PARTICIPANT WORKS</text><text x="64" y="154" font-size="46" font-weight="600">学びを、つくる体験へ。</text><text x="64" y="196" font-size="22" fill="#5b6b64">デジカフェ参加者によるアプリ・Webサイト制作例</text>${cards.join('')}<path d="M64 829H1776" stroke="#b9c9bc"/><text x="64" y="872" font-size="19" fill="#5b6b64">参加者の制作例 / 公開デモ画面</text><text x="1776" y="872" text-anchor="end" font-size="17" letter-spacing="2">LEARN · BUILD · SHARE</text></g></svg>`;
await sharp(Buffer.from(svg)).webp({quality:90}).toFile('public/images/portfolio/digicafe-participant-works.webp');
