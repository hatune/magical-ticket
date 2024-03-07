import { test, expect } from '@playwright/test';
// 楽して魔法の未来をつかむために
const settings = {
	'url': 'https://localhost',
	'姓': '',
	'名':'',
	'姓カナ': '',
	'名カナ': '',
	'性別': '',// 女性 or 男性
	'誕生日': '',// ハイフン区切り YYYY-MM-DD
	'電話番号': '',// ハイフン区切り xxx-xxxx-xxxx
	'メールアドレス': '',
	'郵便番号': '',// ハイフン区切り xxx-xxxx
	'都道府県': '',
	'市町村': '',
	'町域': '',
	'番地': '',
	'パスワード': '',// 申し込み確認用パスワード
	'同行者名': '',
	'同行者電話番号': '' 
}

test('c', async ({ page })=> {
  await page.goto(settings['url'])
	// たぶん 了承しましたチェックと申し込むボタン
	// 公演選択
	// 枚数選択
	// 座席選択 第一希望てきな

	await page.getByRole('textbox', {name: 'cstmr_lnm'}).nth(0).fill(settings['姓'])
	await page.getByRole('textbox', {name: 'cstmr_fnm'}).nth(0).fill(settings['名'])
	await page.getByRole('textbox', {name: 'cstmr_lkn'}).nth(0).fill(settings['姓カナ'])
	await page.getByRole('textbox', {name: 'cstmr_fkn'}).nth(0).fill(settings['名カナ'])
	
	await page.getByLabel(settings['性別'], {exact: true}).check()

	const birthday =settings['生年月日'].split('-')
	await page.getByRole('combobox', {'name': 'birth_yyyy'}).nth(0).selectOption(birthday[0])

})