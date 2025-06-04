import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects.ts/page-manager";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage("automation");
});

test.describe("Page Profile", () => {
	test("profile component is defined", async ({ page }) => {
		const pm = new PageManager(page);
		const profile = pm.onPageProfile.profile;
		expect(profile).toBeDefined();
	});

	test("has expected title", async ({ page }) => {
		const pm = new PageManager(page);
		const title = pm.onPageProfile.getContentTitle();
		await expect(title).toHaveText("Automation Page");
	});
});
