import { expect, test } from "@playwright/test";

test("Find URL and title", async ({ page }) => {
  await page.goto("http://frontend:3000/", { timeout: 60000 });
  await expect(
    page.getByRole("heading", {
      name: "Louez aujourd'hui, venez le récupérer dans l'heure",
    })
  ).toBeVisible();
});

test("Find all pages", async ({ page }) => {
  await page.goto("http://frontend:3000/products", { timeout: 80000 });
  await page.goto("http://frontend:3000/products/add", { timeout: 80000 });
  await page.goto("http://frontend:3000/cart", { timeout: 80000 });
});

// cmd execute test : pnpm exec playwright test
