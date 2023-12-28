const { test, expect } = require("@playwright/test");

test("check maintenance info", async ({ page }) => {
  await page.goto("https://www.energo-pro.bg/bg/planirani-prekysvanija");
  const varna = await page.locator("#areas").getByText("Област Варна");
  await varna.click();
  const vsi4kiAktivni = await page.getByText("Всички активни");
  await vsi4kiAktivni.click();
  const info = await page.locator("#interruption_areas");
  await info.screenshot({ path: "screenshot.png" });
});