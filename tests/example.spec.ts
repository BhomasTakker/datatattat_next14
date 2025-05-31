import { test, expect } from "@playwright/test";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	await page.goto("https://datatattat.com");
});

test("has title", async ({ page }) => {
	const header = page.locator("header");
	const title = await header.locator("h2").textContent();
	expect(title).toEqual("DATATATTAT");
});
