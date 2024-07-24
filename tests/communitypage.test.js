import { test, expect } from "@playwright/test";

test("Friend card appears when user's email is input", async ({ page }) => {
  await page.goto("http://localhost:3000/communityPage");

  await page.click("text=Add Friends");

  await page.getByLabel("Email address").fill("test123@gmail.com");

  await page.keyboard.press("Enter");

  await expect(page.getByText("tx test test")).toBeTruthy();
});

test("Error alert appears when nonexistent user is searched", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/communityPage");

  await page.click("text=Add Friends");

  await page.getByLabel("Email Address").fill("doesnotexist@gmail.com");

  await page.keyboard.press("Enter");

  const element = await page.getByText("No user found");

  expect(element).not.toBeNull();
});

test("User cannot send friend reqeust to himself", async ({ page }) => {
  await page.goto("http://localhost:3000/communityPage");

  await page.click("text=Add Friends");

  await page.getByLabel("Email address").fill("test@gmail.com");

  await page.keyboard.press("Enter");

  await page.locator(':nth-match(:text("Send request"), 1)').click();

  page.on("dialog", async (alert) => {
    const text = alert.message();
    console.log(text);
    await expect(text.match("You can't befriend yourself...!"));
  });
});
