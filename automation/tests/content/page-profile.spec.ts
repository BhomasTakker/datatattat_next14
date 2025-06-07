import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects.ts/page-manager";
import { AutomationPages } from "../../utils/navigation";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage(AutomationPages.automation);
});

test.describe("Page Profile", () => {
	test("profile component is defined", async ({ page }) => {
		const pm = new PageManager(page);
		const profile = pm.onContentPage.profile;
		expect(profile).toBeDefined();
	});

	test("has expected title", async ({ page }) => {
		const pm = new PageManager(page);
		const profile = pm.onContentPage.profile;
		const title = profile.getContentTitle();
		await expect(title).toHaveText("Automation Page");
	});
});
