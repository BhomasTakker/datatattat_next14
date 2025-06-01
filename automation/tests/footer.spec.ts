import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects.ts/page-manager";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage();
});

test.describe("Footer", () => {
	test("is copyright message defined", async ({ page }) => {
		const pm = new PageManager(page);
		const copyright = await pm.onFooterPage.getCopyright();
		expect(copyright).toBeDefined();
	});
});
