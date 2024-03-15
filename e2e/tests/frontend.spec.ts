import { expect, test } from "@playwright/test";

test("Find URL and title", async ({ page }) => {
  await page.goto("http://localhost:3000/", { timeout: 60000 });
  await expect(
    page.getByRole("heading", {
      name: "Louez aujourd'hui, venez le récupérer dans l'heure",
    })
  ).toBeVisible();
});

test("Find all pages", async ({ page }) => {
  await page.goto("http://localhost:3000/products");
  await page.goto("http://localhost:3000/cart");
  await page.goto("http://localhost:3000/profile");
});

// cmd execute test : pnpm exec playwright test
