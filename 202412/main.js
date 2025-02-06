const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.setExtraHTTPHeaders({
		Accept: "application/json",
		"Accept-Language": "ja-JP,ja;q=0.9",
		Referer: "https://www.streetfighter.com",
		Origin: "https://www.streetfighter.com",
	});

	const response = await page.goto(
		"https://www.streetfighter.com/6/buckler/api/ja-jp/stats/usagerate/202412",
		{
			waitUntil: "networkidle2",
		},
	);

	const jsonData = await response.json();
	console.log(JSON.stringify(jsonData, null, 2));

	await browser.close();
})();
