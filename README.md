# Magical 入力補助

個人情報の入力だけでも楽をするためのスクリプトを生成します

## 必要なもの

Node.js か PowerShell

## 情報入力

リネームして編集

`settings.default.json` -> `settings.json`

住所分割まわりは郵便番号入力時に自動で入るやつにうまく合わせてください。

## 実行

```
npm install
node app.ts
```

または PowerShell で

```
./app.ps1 -ExecutionPolicy Bypass
```

出力された JS を個人情報入力の画面で、ブラウザの Developer Tool（F12 で出るやつ）のコンソールに貼り付けて実行します。

フォームを埋めるだけなので、適宜内容を確認してから送信ボタンを押してください

（
都道府県の select 順が都道府県コード順であると想定して作ってるので、もしかしたらずれるかも）

## Playwright

ぴあ ID 入れるところまで動くはず。

setting.json に`url`と`公演番号`が必要

```
// 申し込みのULR
"url": "https://pia.jp/piajp/v/magicalmirai24-1/",

// 開催日時順に、1からかぞえた番号（0からじゃないよ）
"公演番号": 2
```
