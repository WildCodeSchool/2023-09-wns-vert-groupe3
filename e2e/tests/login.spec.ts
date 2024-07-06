import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

   test('should load login page and display all elements', async ({ page }) => {
      // Navigate to the login page
      // await page.goto('http://frontend:3000/login');

      await page.goto('http://localhost:3000/login');


      // Wait for the page to load
      await page.waitForLoadState('networkidle');

      await expect(page.getByRole('heading', { name: 'Se connecter à votre compte' })).toBeVisible();

      await expect(page.locator('input[name="email"]')).toBeVisible();

      await expect(page.locator('input[name="password"]')).toBeVisible();

      await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();

      await expect(page.locator('input[type="checkbox"][id="remember"]')).toBeVisible();

      await expect(page.getByRole('link', { name: 'Mot de passe oublié ?' })).toBeVisible();

      await expect(page.getByRole('link', { name: "S'enregistrer" })).toBeVisible();
   });
});
