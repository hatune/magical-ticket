// node main.mjs

import { chromium } from "playwright";
import fs from "fs";

const settings = JSON.parse(fs.readFileSync("./settings.json", "utf8"));
const LONG_TIMEOUT = 30 * 60 * 1000;

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();

const fillByName = async (name, value, options) => {
  await page.locator(`input[name=${name}]`).fill(value, options);
};

const checkNthByName = async (name, index, options) => {
  await page.locator(`input[name=${name}]`).nth(index).check(options);
};

const selectByName = async (name, value, options) => {
  await page.locator(`select[name=${name}]`).selectOption(value, options);
};

await page.goto(settings.url);
await page.getByRole("button", { name: "申込手続きへ" }).nth(0).click();
await page.getByRole("button", { name: "次へ" }).click();
await page.getByRole("checkbox").nth(0).check();
await page.getByRole("button", { name: "同意の上、申込画面へ" }).click();

console.log("【個人情報入力】");
await fillByName("cstmr_lnm", settings["姓"]);
await fillByName("cstmr_fnm", settings["名"]);
await fillByName("cstmr_lkn", settings["姓カナ"]);
await fillByName("cstmr_fkn", settings["名カナ"]);
await checkNthByName("sex_typ", settings["性別"] === "女" ? 0 : 1);

const [birthYear, birthMonth, birthDay] = settings["生年月日"].split("-");
await selectByName("birth_yyyy", birthYear);
await selectByName("birth_mm", birthMonth.padStart(2, "0"));
await selectByName("birth_dd", birthDay.padStart(2, "0"));

const [tel1, tel2, tel3] = settings["電話番号"].split("-");
await fillByName("telno1", tel1);
await fillByName("telno2", tel2);
await fillByName("telno3", tel3);
await fillByName("ml_addr", settings["メールアドレス"]);
await fillByName("ml_addr_cnfm", settings["メールアドレス"]);

const [postal1, postal2] = settings["郵便番号"].split("-");
await fillByName("cmnt01", postal1);
await fillByName("cmnt02", postal2);
// await page.getByRole("button", { name: "住所検索" }).click();
await selectByName("cmnt11", settings["都道府県"]);
await fillByName("cmnt12", settings["住所1"]);
await fillByName("cmnt13", settings["住所2"]);
await fillByName("cmnt14", settings["住所3"]);
await fillByName("gnrl_cstmr_passwd", settings["パスワード"]);

const hasCompanion = Boolean(settings["同行者名"]);
if (hasCompanion) {
  await fillByName("cmnt21", settings["同行者名"]);
  await fillByName("cmnt22", settings["同行者電話番号"]);
}

// await page.getByRole("button", { name: "希望公演選択へ" }).click();
console.log("【公演選択】");
console.log("【座席希望選択】……第一希望の枚数だけ自動で選択します");
// await checkNthByName("hope_stk_stknd_cd", 0); // 一番高い席
// await page.locator("input[name=entry4-1]").click();
await selectByName("hope_numsht", hasCompanion ? "2枚" : "1枚", {
  timeout: LONG_TIMEOUT,
});
// await page.locator("input[name=entry5]").click();
// await page.locator('input[value="希望追加へ"]').click();
// await page.locator('input[value="決済方法選択へ"]').click();

console.log("【支払い方法選択】");
if (settings["セブン-イレブンで支払い"] === true) {
  await checkNthByName("stlmnt_mtd_typ", 0, { timeout: LONG_TIMEOUT });
  await page.locator("input[name=entry6]").click();
} else {
  await checkNthByName("stlmnt_mtd_typ", 1, { timeout: LONG_TIMEOUT });
  const card = settings.credit;
  if (card) {
    await fillByName("stlmnt_card_no", card.number);
    await fillByName("card_holder_name", card.name);
    await fillByName("card_trmvld_year_da", card.year);
    const month = String(card.month).padStart(2, "0");
    await selectByName("card_trmvld_month_da", month);
    await checkNthByName("card_pay_typ", 0); // 一括で払え
    await fillByName("scrtyCd", card.cvv);
  }
  // await page.locator("input[name=entry6]").click({ timeout: LONG_TIMEOUT });
}

console.log("【ぴあログイン】");
const pia = settings.pia;
if (pia?.id && pia?.password) {
  await fillByName("loginId", pia.id, { timeout: LONG_TIMEOUT });
  await fillByName("passwd", pia.password);
}
