import { Locator, Page } from "@playwright/test";
import { Base } from "../base";

// argument for PageProfile to extend a Base Locator rather then page
// BUT is this a good idea, as it will not be able to use the page methods
export class PageProfile extends Base {
	private readonly _container: Locator;
	private readonly _profile: Locator;

	constructor(page: Page, container: Locator) {
		super(page);
		this._container = container;
		this._profile = this._container.getByTestId("page-profile-root");
	}

	get profile(): Locator {
		return this._profile;
	}

	getContentTitle() {
		return this._container.getByRole("heading", { name: "Automation Page" });
	}
}
