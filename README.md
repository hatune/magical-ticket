# Magical 入力補助

個人情報の入力だけでも楽をするためのスクリプトを生成します。

２名申し込みまでしか考慮していません。

## 必要なもの

Node.js か PowerShell

動作確認はNode.jsは概ね最新のもの、PowerShellは7.4を使用しています。

__「Windows PowerShell」は使えません__ PowerShell 7以降をインストールして使用してください。Windows PowerShellは最新でも5.1なのであきらめてください。

## 情報入力

リネームして編集

`settings.default.json` -> `settings.json`

住所分割まわりは郵便番号入力時に自動で入るやつにうまく合わせてください。

## 実行

```
npm install
node app.ts
```

または PowerShell (__PowerShell 7__) で

```
./app.ps1 -ExecutionPolicy Bypass
```

出力された JS を個人情報入力の画面で、ブラウザの Developer Tool（F12 で出るやつ）のコンソールに貼り付けて実行します。

フォームを埋めるだけなので、適宜内容を確認してから送信ボタンを押してください

（都道府県の select 順が都道府県コード順であると想定して作ってるので、もしかしたらずれるかも）

# もっと楽するための Playwright

画面遷移もある程度自動で行います。要所要所で待ちを発生させているので、そこは手動入力してください（後述）。


## 準備

Node.jsに加えてPlaywrightが必要です。

`npm install` とか `npx playwright install`とかしてください。


## 追加情報入力

setting.json に`url`と`セブン-イレブンで支払い`と`pia`が必要です。

```
// 申し込みのULR
"url": "https://pia.jp/piajp/v/.../",

// 支払い方法（コンビニ決済ならtrue）
"セブン-イレブンで支払い": true

// クレジットカード情報（任意）
"credit": {"number": "1234567890129921", "year": "2026", "month": "01", "cvv": "123"},

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