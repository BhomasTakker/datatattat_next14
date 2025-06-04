import { Locator, Page } from "@playwright/test";
import { Base } from "../base";

export class ContentPage extends Base {
	private readonly _content: Locator;

	constructor(page: Page) {
		super(page);
		this._content = this.page.locator("main");
	}

	get content(): Locator {
		return this._content;
	}
}
