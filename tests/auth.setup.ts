import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await page.getByPlaceholder("Enter email").fill("test@gmail.com");
  await page.getByPlaceholder("Enter password").fill("123456");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Happiness Level")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
