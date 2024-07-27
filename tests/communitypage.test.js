import { test, expect } from "@playwright/test";

test("Friend card appears when user's email is input", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByAltText("Tailwind CSS Navbar component").click();

  await page.getByText("My Friends").click();

  await page.getByRole("button", { name: "Add Friends" }).click();

  await page.getByLabel("Email address").fill("test@gmail.com");

  await page.keyboard.press("Enter");

  await expect(page.getByText("dingleberry")).toBeTruthy();
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
  await page.goto("http://localhost:3000");

  await page.getByAltText("Tailwind CSS Navbar component").click();

  await page.getByText("My Friends").click();

  await page.getByRole("button", { name: "Add Friends" }).click();

  await page.getByLabel("Email address").fill("test@gmail.com");

  await page.keyboard.press("Enter");

  await page.locator(':nth-match(:text("Send Request"), 1)').click();

  await page.getByRole("button", { name: "Close" }).click();

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("You can't befriend yourself...!");
    await dialog.dismiss();
  });
});

test("User cannot send friend reqeust to a person already added as a friend", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  await page.getByAltText("Tailwind CSS Navbar component").click();

  await page.getByText("My Friends").click();

  await page.getByRole("button", { name: "Add Friends" }).click();

  await page.getByLabel("Email address").fill("test@gmail.com");

  await page.keyboard.press("Enter");

  await page.locator(':nth-match(:text("Send Request"), 1)').click();

  await page.getByRole("button", { name: "Close" }).click();

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain(
      "You are already friends with that user :D"
    );
    await dialog.dismiss();
  });
});
