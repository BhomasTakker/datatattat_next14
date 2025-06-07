import { test, expect } from "@playwright/test";
import { PageManager } from "../../page-objects.ts/page-manager";
import { AutomationPages } from "../../utils/navigation";

// we need vary between use live and load dev or test?
test.beforeEach(async ({ page }) => {
	const pm = new PageManager(page);
	await pm.navigateTo.browserNavigateToContentPage(AutomationPages.automation);
});

test.describe("Content Components", () => {
	test("page renders expected number of components", async ({ page }) => {
		const pm = new PageManager(page);
		const contentComponents = pm.onContentPage.contentComponents;
		const componentCount = await contentComponents.components.count();
		expect(componentCount).toEqual(2);
	});

	test("components have expected titles", async ({ page }) => {
		const pm = new PageManager(page);
		const contentComponents = pm.onContentPage.contentComponents;
		const firstComponent = contentComponents.getComponentByIndex(0);
		const secondComponent = contentComponents.getComponentByIndex(1);
		const firstTitle = await contentComponents
			.getComponentTitle(firstComponent)
			.textContent();
		const secondTitle = await contentComponents
			.getComponentTitle(secondComponent)
			.textContent();
		expect(firstTitle).toEqual("Test Component 1");
		expect(secondTitle).toEqual("Test Component 2");
	});
	test("expect component title to be clickable and navigate to correct page", async ({
		page,
	}) => {
		const pm = new PageManager(page);
		const contentComponents = pm.onContentPage.contentComponents;
		const firstComponent = contentComponents.getComponentByIndex(0);
		const firstTitle = contentComponents.getComponentTitle(firstComponent);
		await firstTitle.click();
		// Assuming the first component navigates to a specific URL
		await expect(page).toHaveURL(/.*article-collection/);
	});
});
