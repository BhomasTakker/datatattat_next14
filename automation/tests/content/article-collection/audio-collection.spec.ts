import { test, expect, Locator } from "@playwright/test";
import { PageManager } from "../../../page-objects.ts/page-manager";
import { AutomationPages } from "../../../utils/navigation";

// Potentially worth cretaing a Video Component test class?
test.describe("Audio Collection", () => {
	let audioDisplay: Locator;
	test.beforeEach(async ({ page }) => {
		const pm = new PageManager(page);
		await pm.navigateTo.browserNavigateToContentPage(
			AutomationPages.audioCollection
		);
		const components = pm.onContentPage.contentComponents;
		const component = components.getComponentByIndex(0);
		audioDisplay = component.getByTestId("audio-display");
	});
	test("renders display article", async ({ page }) => {
		await audioDisplay.scrollIntoViewIfNeeded();
		const displayArticle = audioDisplay.getByTestId("display-article");
		await expect(displayArticle).toBeVisible();
	});
	test("renders audio player", async ({ page }) => {
		await audioDisplay.scrollIntoViewIfNeeded();
		const audioPlayer = audioDisplay.getByTestId("audio-player");
		await expect(audioPlayer).toBeVisible();
	});
	test("renders articles list", async ({ page }) => {
		await audioDisplay.scrollIntoViewIfNeeded();
		const audioList = audioDisplay.getByTestId("articles-list");
		await expect(audioList).toBeVisible();
	});
	test("not all articles are rendered", async ({ page }) => {
		const audioList = audioDisplay.getByTestId("articles-list");
		const articles = audioList.locator("article");
		const articleCount = await articles.count();

		const children = audioDisplay.locator("div");
		const childCount = await children.count();
		expect(childCount).toBeGreaterThan(articleCount);
	});
	test("can scroll last element in to view", async ({ page }) => {
		const audioList = audioDisplay.getByTestId("articles-list");
		const children = audioList.locator("div");

		const lastChild = children.last();

		await expect(lastChild).not.toBeInViewport();

		// this scrolls the last child into view
		await lastChild.scrollIntoViewIfNeeded();

		await expect(lastChild).toBeInViewport();
	});

	test("update display article on click new", async () => {
		const displayArticle = audioDisplay.getByTestId("display-article");

		await expect(displayArticle).toHaveText(/More aftershocks hit Myanmar/i);
		const audioList = audioDisplay.getByTestId("articles-list");
		const articles = audioList.locator("article");
		const article = articles.nth(2);
		await article.click();
		await expect(displayArticle).toHaveText(
			/Adolescence: what teen boys really think of girls, influencers and porn/i
		);
	});
});
