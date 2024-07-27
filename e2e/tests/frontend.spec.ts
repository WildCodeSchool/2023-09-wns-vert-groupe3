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

test("Find all public pages", async ({ page }) => {
  await page.goto("http://frontend:3000/products");
  await page.goto("http://frontend:3000/products/1");
  await page.goto("http://frontend:3000/login");

  // await page.goto("http://localhost:3000/products");
  // await page.goto("http://localhost:3000/products/1");
  // await page.goto("http://localhost:3000/login");
});

test("Should create a new user and login", async ({ page }) => {
  // Navigate to the register page
  await page.goto("http://frontend:3000/register");

  await page.fill('input[name="username"]', "newuser");
  await page.fill('input[name="email"]', "newuser@example.com");
  await page.fill('input[name="password"]', "NewUserPassword!1");
  await page.fill('input[name="confirmPassword"]', "NewUserPassword!1");

  await page.click('button:has-text("S\'enregistrer")');

  await page.waitForNavigation({ waitUntil: "networkidle", timeout: 20000 });

  await page.goto("http://frontend:3000/login");

  await page.fill('input[name="email"]', "newuser@example.com");
  await page.fill('input[name="password"]', "NewUserPassword!1");

  await page.click('button:has-text("Se connecter")');

  await page.waitForNavigation({ waitUntil: "networkidle", timeout: 20000 });

  const token = await page.evaluate(() => localStorage.getItem("jwt"));
  expect(token).not.toBeNull();

  //   await page.waitForURL("http://frontend:3000/profile", { timeout: 10000 });
  //   await page.waitForLoadState("networkidle");

  //   await expect(
  //     page.getByRole("heading", { name: "Profil de l'utilisateur" })
  //   ).toBeVisible({ timeout: 10000 });

  //   const emailLocator = page.locator('dd:text("newuser@example.com")');
  //   await expect(emailLocator).toBeVisible({ timeout: 10000 });
});

// cmd execute test : pnpm exec playwright test
