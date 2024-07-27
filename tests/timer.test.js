import { test, expect } from "@playwright/test";

test("Pomodoro Timer displays on Productivity Page", async ({ page }) => {
  // const browser = await chromium.launch({ headless: false });
  // const context = await browser.newContext();
  // const page = await context.newPage();

  await page.goto("http://localhost:3000/");

  await page.click("text=Productivity Page");

  await expect(page.getByText("Pomodoro Timer")).toBeVisible();
});

test("Start button starts the timer", async ({ page }) => {
  await page.goto("http://localhost:3000/studyTips");

  await page.click("text=Focus");

  // click on start button of timer
  await page.click("text=Start");

  await page.waitForTimeout(1000); // wait for 1 second to let the timer update

  expect(page.getByText("24")).toBeVisible();
});

test("Reset button resets the timer", async ({ page }) => {
  await page.goto("http://localhost:3000/studyTips");

  await page.click("text=Focus");

  // click on start button of timer
  await page.click("text=Start");

  await page.waitForTimeout(1000);

  await page.click("text=Reset");

  expect(page.getByText("25 : 00")).toBeVisible();
});

test("Pause button works correctly to pause the timer", async ({ page }) => {
  await page.goto("http://localhost:3000/studyTips");

  // wait for start button to appear and start timer
  await page.click("text=Start");

  // wait for timer to start counting down 1 second
  await page.waitForTimeout(1000);

  await page.click("text=Pause");

  await page.waitForTimeout(1000);

  const timerDisplay = await page.getByTitle(
    "timer-display",
    (element) => element.textContent
  );

  await page.waitForTimeout(1000);

  const updatedTimerDisplay = await page.getByTitle(
    "timer-display",
    (element) => element.textContent
  );

  expect(timerDisplay).toEqual(updatedTimerDisplay);
});

test("Break button correctly switches to break mode", async ({ page }) => {
  await page.goto("http://localhost:3000/studyTips");

  await page.click("text=Break");

  await page.waitForTimeout(1000);

  // Assert that the element with text "05" is visible
  const element = await page.$("text=05 : 00");
  expect(element).not.toBeNull(); // Check if element is found
});
