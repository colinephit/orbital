import { test, expect } from "@playwright/test";

test("should navigate to the about us page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("text=About Us");

  await expect(page).toHaveURL("http://localhost:3000/aboutUs");
});

test("should navigate to the to do list page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("text=To Do List");

  await expect(page).toHaveURL("http://localhost:3000/toDoList");
});

test("should navigate to the productivity tips page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("text=Productivity Page");

  await expect(page).toHaveURL("http://localhost:3000/studyTips");
});

test("should log in", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("text=Login");

  await expect(page).toHaveURL(
    "http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );

  await page.click("button");
});
