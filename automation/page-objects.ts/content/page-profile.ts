import { Locator, Page } from "@playwright/test";
import { ContentPage } from "./content-page";

export class PageProfile extends ContentPage {
	private readonly _profile: Locator;

	constructor(page: Page) {
		super(page);
		this._profile = this.page.getByTestId("page-profile-root");
	}

	get profile(): Locator {
		return this._profile;
	}

	getContentTitle() {
		return this.profile.getByRole("heading", { name: "Automation Page" });
	}
}
