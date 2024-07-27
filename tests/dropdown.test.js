import { test, expect } from "@playwright/test";

test("dropdown contains correct link to profile page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const profileButton = await page.getByAltText(
    "Tailwind CSS Navbar component"
  );
  await profileButton.click();

  await page.click("text=points");
  expect(page).toHaveURL("http://localhost:3000/profile");
});
