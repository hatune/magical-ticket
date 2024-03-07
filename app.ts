const fs = require('node:fs')

const s = JSON.parse(fs.readFileSync('./settings.json', 'utf8'))
const pref = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県']

const birthday = s['生年月日'].split('-')
const birthdayYearNum = parseInt(birthday[0]) - 1929
const tel = s['電話番号'].split('-')
const postal = s['郵便番号'].split('-')
const genderNum = s['性別'] == '女' ? 0 : 1
const prefNum = pref.findIndex((p) => p == s['都道府県']) +1

console.log(`
document.getElementsByName('cstmr_lnm')[0].value = '${s["姓"]}';
document.getElementsByName('cstmr_fnm')[0].value = '${s["名"]}';
document.getElementsByName('cstmr_lkn')[0].value = '${s["姓カナ"]}';
document.getElementsByName('cstmr_fkn')[0].value = '${s["名カナ"]}';
document.getElementsByName('sex_typ')[${genderNum}].checked = true;
document.getElementsByName('birth_yyyy')[0].selectedIndex = ${birthdayYearNum};
document.getElementsByName('birth_mm')[0].selectedIndex = ${parseInt(birthday[1])};
document.getElementsByName('birth_dd')[0].selectedIndex = ${parseInt(birthday[2])};
document.getElementsByName('telno1')[0].value = '${tel[0]}';
document.getElementsByName('telno2')[0].value = '${tel[1]}';
document.getElementsByName('telno3')[0].value = '${tel[2]}';
document.getElementsByName('ml_addr')[0].value = '${s["メールアドレス"]}';
document.getElementsByName('ml_addr_cnfm')[0].value = '${s["メールアドレス"]}';
document.getElementsByName('cmnt01')[0].value = '${postal[0]}';
document.getElementsByName('cmnt02')[0].value = '${postal[1]}';
document.getElementsByName('cmnt11')[0].selectedIndex = ${prefNum};
document.getElementsByName('cmnt12')[0].value = '${s["住所1"]}';
document.getElementsByName('cmnt13')[0].value = '${s["住所2"]}';
document.getElementsByName('cmnt14')[0].value = '${s["住所3"]}';
document.getElementsByName('gnrl_cstmr_passwd')[0].value = '${s["パスワード"]}';
document.getElementsByName('cmnt21')[0].value = '${s["同行者名"]}';
document.getElementsByName('cmnt22')[0].value = '${s["同行者電話番号"]}';
`)