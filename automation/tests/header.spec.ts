import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects.ts/page-manager";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage();
});

test.describe("Header", () => {
	test("has title", async ({ page }) => {
		const pm = new PageManager(page);
		const title = await pm.onHeaderPage.getTitle();
		expect(title).toEqual("DATATATTAT");
	});

	test("open user menu", async ({ page }) => {
		const pm = new PageManager(page);

		const userMenu = pm.onHeaderPage.getUserMenu();
		expect(userMenu).toBeDefined();

		// problem is that we need to log in to be able to even open the menu!
		////////////////////////////////////////////////////////////
		// const userMenu = await header.openUserMenu();
		// const userMenuOpen = await userMenu.isVisible();
		// expect(userMenuOpen).toBe(true);
		// const userMenuText = await userMenu.textContent();
		// expect(userMenuText).toContain("User Menu"); // Adjust based on actual menu content
	});
});
