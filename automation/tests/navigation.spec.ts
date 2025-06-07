import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects.ts/page-manager";
import { BASE_URL } from "../utils";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage();
});

test.describe("Page Navigation", () => {
	test("navigate to UK", async ({ page }) => {
		const pm = new PageManager(page);
		// homeViaHeader, homeViaIcon, viaHeaderNav for e.g.
		await pm.navigateTo.navigateToUK();

		// update to automation
		await expect(page).toHaveURL(`${BASE_URL}/uk`);
	});
});
