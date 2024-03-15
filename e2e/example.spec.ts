import { test, expect } from '@playwright/test';
import fs from 'node:fs'
const settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'))


test('magical', async ({ page })=> {

  await page.goto(settings['url'])
	await page.getByRole('button', {name: '申込手続きへ'}).nth(0).click()
  await page.getByRole('button', {name: '次へ'}).click()
  await page.getByRole('checkbox').nth(0).check()
  await page.getByRole('button', {name: '同意の上、申込画面へ'}).click()

  await page.locator('input[name=cstmr_lnm]').fill(settings['姓'])
	await page.locator('input[name=cstmr_fnm]').fill(settings['名'])
	await page.locator('input[name=cstmr_lkn]').fill(settings['姓カナ'])
	await page.locator('input[name=cstmr_fkn]').fill(settings['名カナ'])
  const gNum = settings['性別'] == '女' ? 0 : 1
  await page.locator('input[name=sex_typ]').nth(gNum).check()
  const birthday =settings['生年月日'].split('-')
  //const birthdayYearNum = parseInt(birthday[0]) - 1929
	await page.locator('select[name=birth_yyyy]').selectOption(`${birthday[0]}`)
  await page.locator('select[name=birth_mm]').selectOption(`${birthday[1]}`.padStart(2, '0'))
  await page.locator('select[name=birth_dd]').selectOption(`${birthday[2]}`.padStart(2, '0'))
  const tel = settings['電話番号'].split('-')
  await page.locator('input[name=telno1]').fill(tel[0])
  await page.locator('input[name=telno2]').fill(tel[1])
  await page.locator('input[name=telno3]').fill(tel[2])
  await page.locator('input[name=ml_addr]').fill(settings['メールアドレス'])
  await page.locator('input[name=ml_addr_cnfm]').fill(settings['メールアドレス'])
  const postal = settings['郵便番号'].split('-')
  await page.locator('input[name=cmnt01]').fill(postal[0])
  await page.locator('input[name=cmnt02]').fill(postal[1])
  //await page.getByRole('button', {name: '住所検索'}).click()
  await page.locator('select[name=cmnt11]').selectOption(settings['都道府県'])
  await page.locator('input[name=cmnt12]').fill(settings['住所1'])
  await page.locator('input[name=cmnt13]').fill(settings['住所2'])
  await page.locator('input[name=cmnt14]').fill(settings['住所3'])
  await page.locator('input[name=gnrl_cstmr_passwd]').fill(settings['パスワード'])
  if(settings['同行者名']){
    await page.locator('input[name=cmnt21]').fill(settings['同行者名'])
    await page.locator('input[name=cmnt22]').fill(settings['同行者電話番号'])
  }
  // == 個人情報まででよければここから先をコメントアウト ==
  await page.waitForTimeout(2000)// まごころ
  await page.getByRole('button', {name: '希望公演選択へ'}).click()

  const en = parseInt(settings['公演番号']) + 1
  await page.locator('input[name=hope_event_perf_cd]').nth(en).check()
  await page.waitForTimeout(1000)// まごころ
  await page.locator('input[name=entry3]').click()

  // == ここから座席選択 このあたりから手動のほうがよいかも
  // == めんどうなのでSSしかとれない 企画展の有無とかよくわかんない
  await page.locator('input[name=hope_stk_stknd_cd]').nth(0).check()
  await page.locator('input[name=entry4-1]').click()

  if (settings['同行者名']){
    await page.locator('select[name=hope_numsht]').selectOption('2枚')
  } else {
    await page.locator('select[name=hope_numsht]').selectOption('1枚')
  }
  await page.locator('input[name=entry5]').click()

  // 希望追加へ
  //await page.locator('input[value="希望追加へ"]').click()

  await page.locator('input[value="決済方法選択へ"]').click()

  //セブン-イレブンで支払い
  await page.locator('input[name=stlmnt_mtd_typ]').nth(0).check()

  await page.locator('input[name=entry6]').click()

  // ぴあID Chromeとかの自動入力効くのでそっちでよかろ
  // await page.locator('input[name=entry7]').click()

})