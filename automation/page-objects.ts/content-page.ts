import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class ContentPage extends Base {
	private readonly _content: Locator;

	// profile could inherit from ContentPage
	private readonly _profile: Locator;

	constructor(page: Page) {
		super(page);
		this._content = this.page.locator("main");
		this._profile = this.page.getByTestId("page-profile-root");
	}

	get content(): Locator {
		return this._content;
	}

	get profile(): Locator {
		return this._profile;
	}

	getContentTitle() {
		return this.profile.getByRole("heading", { name: "Automation Page" });
	}
}
