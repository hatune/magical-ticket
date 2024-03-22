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

# もっと楽するための Playwright

ぴあ ID を入れるところまで一気に実行します。時々わざと待ちを入れてます。

## 準備

- VSCode
- Playwright Test for VSCode

VSCode いれて、VSCode 上でエクステンションの Playwright Test for VSCode をインストールする。

コマンドラインでもいけるけどどうも終了後にブラウザを終了してしまう

`npm install` も必要です。

## 追加情報入力

setting.json に`url`と`セブン-イレブンで支払い`と`pia`が必要

```
// 申し込みのULR
"url": "https://pia.jp/piajp/v/magicalmirai24-1/",

// 支払い方法（コンビニ決済ならtrue）
"セブン-イレブンで支払い": true

// クレジットカード情報（任意）
"credit": {"number": "1234567890129921", "year": "2026", "month": "1", "cvv": "123"},

// ぴあIDとパスワード
"pia": {"id": "test@example.com", "password": "1243"},
```

## 実行

```
node main.mjs
```

## 手動で行う箇所

手動での操作が必要な箇所が複数あります

- 個人情報入力後のボタンクリック
- 公演選択
- 座席選択（第一希望の枚数だけアシストします）
- クレジットカード決済の場合はカード情報入力後のボタンクリック
- ぴあのログイン実行ボタンクリック
- 確認画面での画像数字入力と完了ボタンクリック

GOOD LUCK!