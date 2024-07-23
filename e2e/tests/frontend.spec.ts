import { expect, test } from "@playwright/test";

test("Find URL and title", async ({ page }) => {
   await page.goto("http://frontend:3000/", { timeout: 60000 });
   //   await page.goto("http://localhost:3000/", { timeout: 60000 });

   await page.pause();
   await expect(
      page.getByRole("heading", {
         name: "Louez aujourd'hui, venez le récupérer dans l'heure",
      })
   ).toBeVisible();
});

test("Find all pages", async ({ page }) => {
   await page.goto("http://frontend:3000/products");
   await page.goto("http://frontend:3000/products/1");
   await page.goto("http://frontend:3000/login");

   // await page.goto("http://localhost:3000/products");
   // await page.goto("http://localhost:3000/products/1");
   // await page.goto("http://localhost:3000/login");
});

test('should load login page and display all elements', async ({ page }) => {
   await page.goto('http://frontend:3000/login');
   // await page.goto('http://localhost:3000/login');

   await page.waitForLoadState('networkidle');
   await expect(page.getByRole('heading', { name: 'Se connecter à votre compte' })).toBeVisible();
   await expect(page.locator('input[name="email"]')).toBeVisible();
   await expect(page.locator('input[name="password"]')).toBeVisible();
   await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
   await expect(page.locator('input[type="checkbox"][id="remember"]')).toBeVisible();
   await expect(page.getByRole('link', { name: "S'enregistrer" })).toBeVisible();
});

// cmd execute test : pnpm exec playwright test
