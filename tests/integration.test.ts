import { test, expect, chromium, Page } from "@playwright/test";

test.describe("Integration Testing", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });
  //test.use({ storageState: { cookies: [], origins: [] } });
  test.describe.configure({ mode: "serial" });

  test("Create user", async ({}) => {
    /*
    await page.goto("http://localhost:3000/");

    await page.click("text=Login");

    await page.click("text=Register Here");

    await page.getByPlaceholder("Enter name").fill("test user 3");
    await page.getByPlaceholder("Enter email").fill("test3@gmail.com");
    await page.getByPlaceholder("Enter password").fill("123456");
    await page.getByRole("button", { name: "Sign Up" }).dblclick();
    */

    await page.waitForTimeout(1000);
  });

  test("Sign in", async ({}) => {
    /*
    await page.getByPlaceholder("Enter email").fill("test3@gmail.com");
    await page.getByPlaceholder("Enter password").fill("123456");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Happiness Level")).toBeVisible();
    */
    await page.waitForTimeout(1000);
  });

  test("Add a task", async ({}) => {
    await page.goto("http://localhost:3000/toDoList");
    await page.getByLabel("Subject").fill("Math");

    await page.getByLabel("Task").fill("Homework");

    await page.focus("[id=':r2:']");
    await page.type("[id=':r2:']", "08312024");

    await page.getByRole("button", { name: "Add Task" }).click();

    await expect(page.getByText("Math")).toBeVisible();
    await expect(page.getByText("Homework")).toBeVisible();
    await expect(page.getByText("31/8/2024")).toBeVisible();
  });

  test("Use pomodoro timer", async ({}) => {
    await page.click("text=Productivity page");

    await page.getByRole("button", { name: "Focus" }).click();

    await page.getByRole("button", { name: "Start" }).click();

    await expect(page.getByText("24")).toBeVisible();
  });

  test("Complete a task", async ({}) => {
    await page.click("text=To Do List");

    await page.getByRole("checkbox").check();

    await page.getByLabel("Hours").click();
    await page.locator(':nth-match(:text("2"), 3)').click();

    await page.getByRole("button", { name: "Confirm" }).click();

    await expect(page.getByText("Math")).toBeVisible();
    await expect(page.getByText("Homework")).toBeVisible();
    await expect(page.getByText("31/8/2024")).toBeVisible();
  });

  test("Send Friend Requests", async ({}) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Friend request has been successfully sent!"
      );
      await dialog.dismiss();
    });

    await page.getByAltText("Tailwind CSS Navbar component").click();

    await page.getByText("My Friends").click();

    await page.getByRole("button", { name: "Add Friends" }).click();

    await page.getByLabel("Email address").fill("test2@gmail.com");

    await page.keyboard.press("Enter");

    await page.locator(':nth-match(:text("Send Request"), 1)').click();

    await page.getByRole("button", { name: "Close" }).click();
  });

  test("Accept Friend Requests", async ({}) => {
    await page.getByRole("button", { name: "Accept" }).click();

    await expect(page.getByText("Coline Phitoyo")).toBeVisible();
  });
});
