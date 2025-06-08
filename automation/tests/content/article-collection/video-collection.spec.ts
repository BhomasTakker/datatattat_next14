import { test, expect, Locator } from "@playwright/test";
import { PageManager } from "../../../page-objects.ts/page-manager";
import { AutomationPages } from "../../../utils/navigation";

// Potentially worth cretaing a Video Component test class?
test.describe("Video Collection", () => {
	let videoDisplay: Locator;
	test.beforeEach(async ({ page }) => {
		const pm = new PageManager(page);
		await pm.navigateTo.browserNavigateToContentPage(
			AutomationPages.videoCollection
		);
		const components = pm.onContentPage.contentComponents;
		const component = components.getComponentByIndex(0);
		videoDisplay = component.getByTestId("video-display");
	});
	test.describe("Vertical Scroll Display ", () => {
		test("renders Vertical Scroll video display", async ({ page }) => {
			await videoDisplay.scrollIntoViewIfNeeded();
			const verticalScroll = videoDisplay.getByTestId("VerticalScroll");
			await expect(verticalScroll).toBeVisible();
		});
		test("renders articles list", async ({ page }) => {
			await videoDisplay.scrollIntoViewIfNeeded();
			const videoList = videoDisplay.getByTestId("articles-list");
			await expect(videoList).toBeVisible();
		});
		test("not all articles are rendered", async ({ page }) => {
			const articles = videoDisplay.locator("article");
			const articleCount = await articles.count();

			const children = videoDisplay.locator("div");
			const childCount = await children.count();
			expect(childCount).toBeGreaterThan(articleCount);
		});
		test("can scroll last element in to view", async ({ page }) => {
			const children = videoDisplay.locator("div");

			const lastChild = children.last();

			await expect(lastChild).not.toBeInViewport();

			// this scrolls the last child into view
			await lastChild.scrollIntoViewIfNeeded();

			await expect(lastChild).toBeInViewport();
		});
	});
});
