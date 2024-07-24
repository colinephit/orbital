import { test, expect } from "@playwright/test";

test("dropdown contains correct link to profile page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const profileButton = await page.getByAltText("Profile picture");
  await profileButton.click();

  await page.click("text=points");
  expect(page).toHaveURL("http://localhost:3000/profile");
});
