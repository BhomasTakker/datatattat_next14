import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects.ts/page-manager";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage();
});

const prod = "https://datatattat.com";
const local = "http://localhost:3000";

test.describe("Page Navigation", () => {
	test("navigate to UK", async ({ page }) => {
		const pm = new PageManager(page);
		// homeViaHeader, homeViaIcon, viaHeaderNav for e.g.
		await pm.navigateTo.navigateToUK();

		await expect(page).toHaveURL(`${local}/uk`);
	});
});
