import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects.ts/page-manager";
import { BASE_URL } from "../utils";
import { AutomationPages } from "../utils/navigation";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage(AutomationPages.automation);
});

test.describe("Header", () => {
	test("has title", async ({ page }) => {
		const pm = new PageManager(page);
		const title = pm.onHeaderPage.title;
		await expect(title).toHaveText("DATATATTAT");
	});
	test("title takes us home", async ({ page }) => {
		const pm = new PageManager(page);
		const title = pm.onHeaderPage.title;
		await title.click();
		await page.waitForURL("**/");
		// seems unnecessary?
		await expect(page).toHaveURL(`${BASE_URL}`);
	});
	test("clicking home logo take us to the home screen", async ({ page }) => {
		const pm = new PageManager(page);
		const logo = await pm.onHeaderPage.getUserHomeLogoButton();
		await logo.click();
		await page.waitForURL("**/");
		// seems unnecessary?
		await expect(page).toHaveURL(`${BASE_URL}`);
	});
	test("can navigate via nav link", async ({ page }) => {
		const pm = new PageManager(page);
		const navigationLink = await pm.onHeaderPage.getRouteLink("NAVIGATION");
		await navigationLink.click();
		await page.waitForURL("**/navigation");
		await expect(page).toHaveURL(`${BASE_URL}/${AutomationPages.navigation}`);
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

	test("donate button is present", async ({ page }) => {
		const pm = new PageManager(page);
		const donateButton = await pm.onHeaderPage.getDonateButton();
		expect(donateButton).toBeDefined();
		await expect(donateButton).toHaveAttribute(
			"href",
			"https://ko-fi.com/Z8Z81DQMUH"
		);
	});
});
