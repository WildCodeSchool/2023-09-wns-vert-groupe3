import { expect, test } from "@playwright/test";

// test("Find URL and title", async ({ page }) => {
//    await page.goto("http://frontend:3000/", { timeout: 60000 });
//    //   await page.goto("http://localhost:3000/", { timeout: 60000 });

//    await page.pause();
//    await expect(
//       page.getByRole("heading", {
//          name: "Louez aujourd'hui, venez le récupérer dans l'heure",
//       })
//    ).toBeVisible();
// });

// test("Find all pages", async ({ page }) => {
//    await page.goto("http://frontend:3000/products");
//    await page.goto("http://frontend:3000/products/1");
//    await page.goto("http://frontend:3000/login");

//    // await page.goto("http://localhost:3000/products");
//    // await page.goto("http://localhost:3000/products/1");
//    // await page.goto("http://localhost:3000/login");
// });

// test('should load login page and display all elements', async ({ page }) => {
//    await page.goto('http://frontend:3000/login');
//    // await page.goto('http://localhost:3000/login');

//    await page.waitForLoadState('networkidle');
//    await expect(page.getByRole('heading', { name: 'Se connecter à votre compte' })).toBeVisible();
//    await expect(page.locator('input[name="email"]')).toBeVisible();
//    await expect(page.locator('input[name="password"]')).toBeVisible();
//    await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
//    await expect(page.locator('input[type="checkbox"][id="remember"]')).toBeVisible();
//    await expect(page.getByRole('link', { name: "S'enregistrer" })).toBeVisible();
// });

test('should login successfully and display user profile', async ({ page }) => {
   await page.goto('http://frontend:3000/login');
   // await page.goto('http://localhost:3000/login');

   await page.waitForLoadState('networkidle');

   // await expect(page.locator('input[name="email"]')).toBeVisible();
   // await expect(page.locator('input[name="password"]')).toBeVisible();
   await page.fill('input[name="email"]', 'admin@admin.com');
   await page.fill('input[name="password"]', 'admin');
   // await page.fill('input[name="email"]', 'admin@admin.com');
   // await page.fill('input[name="password"]', 'Wildrent!1');

   // await page.pause();

   await page.click('button:has-text("Se connecter")');
   await page.waitForNavigation({ waitUntil: 'networkidle' });


   // Wait for navigation to the user's home page or dashboard
   // await page.waitForLoadState('networkidle');
   // const token = await page.evaluate(() => localStorage.getItem('jwt'));
   // expect(token).not.toBeNull();
   // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

   
   await page.waitForURL('http://frontend:3000/profile', { timeout: 10000 });
   // await page.goto('http://localhost:3000/profile');
   await page.waitForLoadState('networkidle');

   await expect(page.getByRole('heading', { name: "Profil utilisateur" })).toBeVisible({ timeout: 10000 });

   const emailLocator = page.locator('dd:text("admin@admin.com")');
   await expect(emailLocator).toBeVisible({ timeout: 10000 });
});

// cmd execute test : pnpm exec playwright test
