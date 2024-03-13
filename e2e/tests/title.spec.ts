import { test } from "@playwright/test";

test("Find URL", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await page.getByRole("link", { name: "Wildrent logo Wildrent" }).click();
});
