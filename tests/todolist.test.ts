import { test, expect, chromium, Page } from "@playwright/test";

test("add task with an invalid deadline", async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://localhost:3000/");

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain(
      "Deadline cannot be set before the current date"
    );
    await dialog.dismiss();
  });

  await page.click("text=To Do List");

  await page.getByLabel("Subject").fill("Math");

  await page.getByLabel("Task").fill("Homework");

  await page.focus("[id=':r2:']");
  await page.type("[id=':r2:']", "02022020");

  await page.getByRole("button", { name: "Add Task" }).click();
});

test.describe("Adding a task", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });
  test.describe.configure({ mode: "serial" });

  test("add task with valid details", async ({}) => {
    await page.goto("http://localhost:3000/");

    await page.click("text=To Do List");

    await page.getByLabel("Subject").fill("Math");

    await page.getByLabel("Task").fill("Homework");

    await page.focus("[id=':r2:']");
    await page.type("[id=':r2:']", "08312024");

    await page.getByRole("button", { name: "Add Task" }).click();

    await expect(page.getByText("Math")).toBeVisible();
    await expect(page.getByText("Homework")).toBeVisible();
    await expect(page.getByText("31/8/2024")).toBeVisible();
  });

  test("update task", async ({}) => {
    await page.goto("http://localhost:3000/");

    await page.click("text=To Do List");
    /*
    await page.getByLabel("Subject").fill("Math");
  
    await page.getByLabel("Task").fill("Homework");
  
    await page.focus("[id=':r2:']");
    await page.type("[id=':r2:']", "08312024");
  
    await page.getByRole("button", { name: "Add Task" }).click();
    */
    await page.getByRole("button", { name: "Update" }).click();
    await page.focus("[id=':r4:']");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.type("[id=':r4:']", "Science");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Science")).toBeVisible();
    await expect(page.getByText("Homework")).toBeVisible();
    await expect(page.getByText("31/8/2024")).toBeVisible();
  });

  test("delete task", async ({}) => {
    await page.goto("http://localhost:3000/");

    await page.click("text=To Do List");

    /*
    await page.getByLabel("Subject").fill("Math");
  
    await page.getByLabel("Task").fill("Homework");
  
    await page.focus("[id=':r2:']");
    await page.type("[id=':r2:']", "08312024");
  
    await page.getByRole("button", { name: "Add Task" }).click();
    */

    await page.getByRole("button", { name: "Delete" }).click();
  });
});
