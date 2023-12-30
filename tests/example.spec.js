const { test, expect } = require("@playwright/test");
const fs = require("fs");

test("check maintenance info", async ({ page }) => {
  await page.goto("https://www.energo-pro.bg/bg/planirani-prekysvanija");
  const varna = await page.locator("#areas").getByText("Област Варна");
  await varna.click();
  const vsi4kiAktivni = await page.getByText("Всички активни");
  await vsi4kiAktivni.click();
  await page.waitForTimeout(5000); // hardkodnato 4akane da zaredi stranicata s poly4enite ot BE danni
  await page.waitForSelector(".interruption-data ul li", { timeout: 5000 });
  const posts = await page.$$(".interruption-data ul li");

  if (posts.length > 0) {
    console.log(posts.length);
    const infoJSON = {};
    let index = 0;
    for (const post of posts) {
      infoJSON[index] = (await post.textContent()).replace(/\s{2}/g, "");
      index++;
    }

    fs.writeFileSync("info.json", JSON.stringify(infoJSON));
  }

  // za pravena na snimka:
  // await info.screenshot({ path: "screenshot.png" });
  // tova da se sloji v package.json:
  // "scripts": {
  //   "start": "cd ./tests && npx playwright test --headed && screenshot.png"
  // },
});
