// node main.mjs

import { chromium } from "playwright";
import fs from "fs";

const settings = JSON.parse(fs.readFileSync("./settings.json", "utf8"));

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto(settings["url"]);
await page.getByRole("button", { name: "申込手続きへ" }).nth(0).click();
await page.getByRole("button", { name: "次へ" }).click();
await page.getByRole("checkbox").nth(0).check();
await page.getByRole("button", { name: "同意の上、申込画面へ" }).click();

console.log("【個人情報入力】")
await page.locator("input[name=cstmr_lnm]").fill(settings["姓"]);
await page.locator("input[name=cstmr_fnm]").fill(settings["名"]);
await page.locator("input[name=cstmr_lkn]").fill(settings["姓カナ"]);
await page.locator("input[name=cstmr_fkn]").fill(settings["名カナ"]);
const gNum = settings["性別"] == "女" ? 0 : 1;
await page.locator("input[name=sex_typ]").nth(gNum).check();
const birthday = settings["生年月日"].split("-");
//const birthdayYearNum = parseInt(birthday[0]) - 1929
await page.locator("select[name=birth_yyyy]").selectOption(`${birthday[0]}`);
await page
    .locator("select[name=birth_mm]")
    .selectOption(`${birthday[1]}`.padStart(2, "0"));
await page
    .locator("select[name=birth_dd]")
    .selectOption(`${birthday[2]}`.padStart(2, "0"));
const tel = settings["電話番号"].split("-");
await page.locator("input[name=telno1]").fill(tel[0]);
await page.locator("input[name=telno2]").fill(tel[1]);
await page.locator("input[name=telno3]").fill(tel[2]);
await page.locator("input[name=ml_addr]").fill(settings["メールアドレス"]);
await page
    .locator("input[name=ml_addr_cnfm]")
    .fill(settings["メールアドレス"]);
const postal = settings["郵便番号"].split("-");
await page.locator("input[name=cmnt01]").fill(postal[0]);
await page.locator("input[name=cmnt02]").fill(postal[1]);
//await page.getByRole('button', {name: '住所検索'}).click()
await page.locator("select[name=cmnt11]").selectOption(settings["都道府県"]);
await page.locator("input[name=cmnt12]").fill(settings["住所1"]);
await page.locator("input[name=cmnt13]").fill(settings["住所2"]);
await page.locator("input[name=cmnt14]").fill(settings["住所3"]);
await page
    .locator("input[name=gnrl_cstmr_passwd]")
    .fill(settings["パスワード"]);
if (settings["同行者名"]) {
    await page.locator("input[name=cmnt21]").fill(settings["同行者名"]);
    await page.locator("input[name=cmnt22]").fill(settings["同行者電話番号"]);
}

// await page.getByRole("button", { name: "希望公演選択へ" }).click();

console.log("【公演選択】")

console.log("【座席希望選択】……第一希望の枚数だけ自動で選択します")
// await page.locator("input[name=hope_stk_stknd_cd]").nth(0).check();// 一番高い席
// await page.locator("input[name=entry4-1]").click();

if (settings["同行者名"]) {
    await page.locator("select[name=hope_numsht]").selectOption("2枚", { timeout: 30 * 60 * 1000 });
} else {
    await page.locator("select[name=hope_numsht]").selectOption("1枚", { timeout: 30 * 60 * 1000 });
}
//await page.locator("input[name=entry5]").click();
//await page.locator('input[value="希望追加へ"]').click()
//await page.locator('input[value="決済方法選択へ"]').click();

console.log("【支払い方法選択】")
if (settings["セブン-イレブンで支払い"] === true) {
    await page.locator("input[name=stlmnt_mtd_typ]").nth(0).check({ timeout: 30 * 60 * 1000 });
    await page.locator("input[name=entry6]").click();
} else {
    await page.locator("input[name=stlmnt_mtd_typ]").nth(1).check({ timeout: 30 * 60 * 1000 });
    const card = settings["credit"]
    if (card) {
        await page.locator("input[name=stlmnt_card_no]").fill(card['number'])
        await page.locator("input[name=card_trmvld_year_da]").fill(card['year'])
        let month = `${card["month"]}`
        //if (month.startsWith("0")) month = month[1]
        if (month.length == 1) month = '0' + month
        await page.locator("select[name=card_trmvld_month_da]").selectOption(month)
        await page.locator("input[name=card_pay_typ]").nth(0).check()// 一括で払え
        await page.locator("input[name=scrtyCd]").fill(card['cvv'])
    }
    //await page.locator("input[name=entry6]").click({timeout: 30 * 60 * 1000});
}

console.log("【ぴあログイン】")
const pia = settings['pia']
if (pia && pia['id'] && pia['password']) {
    await page.locator("input[name=loginId]").fill(pia["id"], { timeout: 30 * 60 * 1000 })
    await page.locator("input[name=passwd]").fill(pia["password"])
}