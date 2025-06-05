import { Locator, Page } from "@playwright/test";
import { Base } from "../base";

// page component has content components
// potentially structure that way?
export class PageComponent extends Base {
	private readonly _container: Locator;
	private readonly _pageComponent: Locator;

	constructor(page: Page, container: Locator) {
		super(page);
		this._container = container;
		this._pageComponent = this._container.getByTestId("page-component");
	}

	get pageComponent(): Locator {
		return this._pageComponent;
	}

	checkClassName(className: string): Promise<boolean> {
		return this.pageComponent.evaluate((el, className) => {
			const classString = el.classList.toString();
			return classString.includes(className);
		}, className);
	}
}
