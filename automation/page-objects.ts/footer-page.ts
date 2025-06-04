import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class FooterPage extends Base {
	private readonly _footer: Locator;
	constructor(page: Page) {
		super(page);
		this._footer = this.page.locator("footer");
	}

	get footer(): Locator {
		return this._footer;
	}

	async getCopyright() {
		return this._footer.getByText(
			"Copyright 2025 ©Datatattat. Datatattat is not responsible for the content of external sites."
		);
	}
}
