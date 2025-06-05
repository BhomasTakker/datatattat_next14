import { Locator, Page } from "@playwright/test";
import { Base } from "../base";
import { PageProfile } from "./page-profile";

export class ContentPage extends Base {
	private readonly _content: Locator;
	private readonly _profile: PageProfile;

	constructor(page: Page) {
		super(page);
		this._content = this.page.locator("main");
		this._profile = new PageProfile(this.page, this._content);
	}

	get content(): Locator {
		return this._content;
	}
	get profile(): PageProfile {
		return this._profile;
	}
}
