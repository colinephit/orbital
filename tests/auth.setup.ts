import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(
    "http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await page.getByPlaceholder("Enter email").fill("test@gmail.com");
  await page.getByPlaceholder("Enter password").fill("123456");
  await page.getByRole("button", { name: "Submit" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //await page.waitForURL("https://localhost:3000/");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText("Happiness Level")).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
