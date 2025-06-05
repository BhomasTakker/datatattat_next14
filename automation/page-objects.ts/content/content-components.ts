import { Locator, Page } from "@playwright/test";
import { Base } from "../base";

// We should have a file of test-id constants
// so we can share across units. tests, and components etc
export class ContentComponents extends Base {
	private readonly _container: Locator;
	private readonly _components: Locator;

	constructor(page: Page, container: Locator) {
		super(page);
		this._container = container;
		this._components = this.page.getByTestId("content-component");
	}

	get components(): Locator {
		return this._components;
	}

	getComponentByIndex(index: number): Locator {
		return this._components.nth(index);
	}

	getComponentTitle(component: Locator) {
		return component.locator("h2");
	}
}
