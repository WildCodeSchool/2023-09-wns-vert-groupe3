import { test } from "@playwright/test";

test("Find URL", async ({ page }) => {
  await page.goto("http://frontend:3000/", { timeout: 60000 });
});

// cmd execute test : pnpm exec playwright test