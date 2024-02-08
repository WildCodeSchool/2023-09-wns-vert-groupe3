import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://frontend:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wildrent/);
  await page.pause();
});
