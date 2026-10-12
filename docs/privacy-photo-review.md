# 掲載写真の顔ぼかし確認（2026-10-12）

本人の位置はユーザーが写真ごとに指定した番号を使い、顔の自動照合は行っていません。

| 確認写真 | ファイル | ぼかさず残す本人の番号 |
| --- | --- | --- |
| A | portfolio/culture-wine-02.jpg | なし（全員をぼかす） |
| B | portfolio/culture-map-05.jpg | なし（全員をぼかす） |
| C | portfolio/culture-beer-04.jpg | 1 |
| D | portfolio/org-culture-reform.jpg | 1 |
| E | mv_sanriku.jpg | なし（全員をぼかす） |
| F | image_pavilion_1.jpg | 3 |
| G | image_ogawamachi_1.png | なし（全員をぼかす） |
| H | image_ogawamachi_2.jpg | 10 |
| I | image_ogawamachi_3.jpg | なし（全員をぼかす） |
| J | image_odo_15.jpg | 10 |
| K | image_odo_20.jpg | 2 |
| L | image_odo_9.jpg | なし（全員をぼかす） |
| M | trip_usa_3.jpg | 1 |

Mは本人のみが写る写真のため変更なし。以前確認されたビール集合写真（右手前）とワイン集合写真（左端）も本人を保持しています。

編集方法: built-in ImageGenで「指定した人物を保持し、その他の顔だけを強くぼかす。構図・背景・資料・文字を維持」と指示。編集結果の顔領域のみ原写真へ合成し、本人の顔の中心領域が符号化前に原写真と一致することを検証しました。領域は scripts/privacy-face-regions.json で管理しています。

掲載先は src/data/privacy-images.json のバージョン付きWebPです。元の公開画像もぼかし版へ差し替え、元の顔を含む圧縮画像とプレースホルダーを削除します。過去のGitコミットには編集前の原写真が残ります。
