const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.setExtraHTTPHeaders({
		Accept: "application/json",
		"Accept-Language": "ja-JP,ja;q=0.9",
		Referer: "https://jp.indeed.com/cmp/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%B9/jobs?jk=8c4e49c2347714c6&start=0", // 企業名をrefererに設定する必要があるかも
    Origin: "https://jp.indeed.com",
	});

  // jobKeyをaタグのidから取得し、それをループして以下エンドポイントからデータを取得する
	const response = await page.goto(
    "https://jp.indeed.com/cmp/-/rpc/fetch-jobs?jobKey=8c4e49c2347714c6&loggedIn=0",
		{
			waitUntil: "networkidle2",
		},
	);

	const jsonData = await response.json();
	console.log(JSON.stringify(jsonData, null, 2));

	await browser.close();
})();
