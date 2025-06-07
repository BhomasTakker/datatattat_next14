import { Locator, Page } from "@playwright/test";

export class Base {
	readonly page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	// no need being here?
	static checkLocatorClassName(
		className: string,
		locator: Locator
	): Promise<boolean> {
		return locator.evaluate((el, className) => {
			const classString = el.classList.toString();
			return classString.includes(className);
		}, className);
	}

	async waitForNumberOfSeconds(timeInSeconds: number) {
		await this.page.waitForTimeout(timeInSeconds * 1000);
	}
}
