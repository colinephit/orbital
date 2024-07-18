import { test, expect, chromium } from "@playwright/test";

test("add task with an invalid deadline", async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://localhost:3000/");

  await page.click("text=To Do List");

  await page.getByLabel("Subject").fill("Math");

  await page.getByLabel("Task").fill("Homework");

  await page.getByText("mm/dd/yyyy");

  //await page.getByRole('').fill("01012020");

  await page.getByRole("button", { name: "Add Task" }).click();

  page.on("dialog", async (alert) => {
    const text = alert.message();
    console.log(text);
    await expect(text.match("Deadline cannot be set before the current date"));
  });

  await page.waitForTimeout(5000);
});
