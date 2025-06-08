import { test, expect, Locator } from "@playwright/test";
import { PageManager } from "../../../page-objects.ts/page-manager";
import { AutomationPages } from "../../../utils/navigation";
import { Base } from "../../../page-objects.ts/base";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage(
		AutomationPages.articleCollection
	);
});

test.describe("Article Collection - Articles", () => {
	test.describe("Stack Scroller", () => {
		let stackScroller: Locator;
		let component: Locator;
		test.beforeEach(async ({ page }) => {
			const pm = new PageManager(page);
			const components = pm.onContentPage.contentComponents;
			component = components.getComponentByIndex(0);
			stackScroller = component.getByTestId("stack-scroller");
			await stackScroller.scrollIntoViewIfNeeded();
		});
		test("has expected class", async ({ page }) => {
			const hasClass = await Base.checkLocatorClassName(
				"stack-scroller",
				stackScroller
			);
			expect(hasClass).toEqual(true);
		});
		test("not all articles are rendered", async ({ page }) => {
			const articles = stackScroller.locator("article");
			const articleCount = await articles.count();

			const children = stackScroller.locator("div");
			const childCount = await children.count();
			expect(childCount).toBeGreaterThan(articleCount);
		});

		test("can scroll last element in to view", async ({ page }) => {
			const children = stackScroller.locator("div");

			const lastChild = children.last();

			await expect(lastChild).not.toBeInViewport();

			// this scrolls the last child into view
			await lastChild.scrollIntoViewIfNeeded();

			await expect(lastChild).toBeInViewport();
		});
	});

	test.describe("StackColumns", () => {
		let stackColumns: Locator;
		let component: Locator;
		test.beforeEach(async ({ page }) => {
			const pm = new PageManager(page);
			const components = pm.onContentPage.contentComponents;
			component = components.getComponentByIndex(1);
			stackColumns = component.getByTestId("stack-columns");
			await stackColumns.scrollIntoViewIfNeeded();
		});
		test("has expected class", async ({ page }) => {
			const hasClass = await Base.checkLocatorClassName(
				"stack-columns",
				stackColumns
			);
			expect(hasClass).toEqual(true);
		});

		test("all articles are rendered", async ({ page }) => {
			const article = stackColumns.getByRole("article").last();
			// we need to make sure the article is in view
			await expect(article).toBeInViewport();
			const articles = stackColumns.locator("article");
			const articleCount = await articles.count();
			expect(articleCount).toEqual(10);
		});
	});

	test.describe("Display 5", () => {
		let display5: Locator;
		test.beforeEach(async ({ page }) => {
			const pm = new PageManager(page);
			const components = pm.onContentPage.contentComponents;
			const component = components.getComponentByIndex(2);
			display5 = component.getByTestId("grid-display-5");
			await display5.scrollIntoViewIfNeeded();
		});
		test("has expected class", async ({ page }) => {
			const hasClass = await Base.checkLocatorClassName("display-5", display5);
			expect(hasClass).toEqual(true);
		});

		test("renders expectd number of articles", async ({ page }) => {
			const articles = display5.locator("article");
			const articleCount = await articles.count();
			expect(articleCount).toEqual(5);
		});
	});

	test.describe("Display 7", () => {
		let display7: Locator;
		test.beforeEach(async ({ page }) => {
			const pm = new PageManager(page);
			const components = pm.onContentPage.contentComponents;
			const component = components.getComponentByIndex(3);
			display7 = component.getByTestId("grid-display-7");
			await display7.scrollIntoViewIfNeeded();
		});
		test("has expected class", async ({ page }) => {
			const hasClass = await Base.checkLocatorClassName("display-7", display7);
			expect(hasClass).toEqual(true);
		});

		test("renders expectd number of articles", async ({ page }) => {
			const articles = display7.locator("article");
			const articleCount = await articles.count();
			expect(articleCount).toEqual(7);
		});
	});
});
