import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class FooterPage extends Base {
	private readonly footer: Locator;
	constructor(page: Page) {
		super(page);
		this.footer = this.page.locator("footer");
	}

	getFooter(): Locator {
		return this.footer;
	}

	async getCopyright() {
		return this.footer.getByText(
			"Copyright 2025 ©Datatattat. Datatattat is not responsible for the content of external sites."
		);
	}
}
