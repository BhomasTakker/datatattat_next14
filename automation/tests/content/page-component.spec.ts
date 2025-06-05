import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects.ts/page-manager";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage("automation");
});

test.describe("Page Component", () => {
	test("has expected class", async ({ page }) => {
		const pm = new PageManager(page);
		const pageComponent = pm.onContentPage.pageComponent;
		const expectedClass = "page-stack";
		const hasClass = await pageComponent.checkClassName(expectedClass);
		expect(hasClass).toBe(true);
	});
});
