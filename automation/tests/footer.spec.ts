import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects.ts/page-manager";
import { iconsList } from "@/components/footer/icons";

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

	test("footer contains expected number of links", async ({ page }) => {
		const pm = new PageManager(page);
		const footer = pm.onFooterPage.footer;
		const links = footer.locator("a");
		expect(await links.count()).toEqual(iconsList.length);
	});

	test("footer links are valid", async ({ page }) => {
		const pm = new PageManager(page);
		const footer = pm.onFooterPage.footer;

		// has x
		const xLink = footer.locator('a[href="https://x.com/datatattat"]');
		expect(await xLink.count()).toBe(1);

		// has reddit
		const redditLink = footer.locator(
			'a[href="https://www.reddit.com/user/datatattat/"]'
		);
		expect(await redditLink.count()).toBe(1);

		// has tiktok
		const tiktokLink = footer.locator(
			'a[href="https://www.tiktok.com/@datatattat"]'
		);
		expect(await tiktokLink.count()).toBe(1);

		// has substack
		const substackLink = footer.locator(
			'a[href="https://substack.com/@datatattat"]'
		);
		expect(await substackLink.count()).toBe(1);
	});
});
