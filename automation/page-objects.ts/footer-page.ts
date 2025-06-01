import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class FooterPage extends Base {
	constructor(page: Page) {
		super(page);
	}

	getFooter(): Locator {
		return this.page.locator("footer");
	}

	async getCopyright() {
		const footer = this.getFooter();
		return footer.getByText(
			"Copyright 2025 ©Datatattat. Datatattat is not responsible for the content of external sites."
		);
	}
}
