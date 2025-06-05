import { Locator, Page } from "@playwright/test";
import { Base } from "../base";
import { PageProfile } from "./page-profile";
import { ContentComponents } from "./content-components";
import { PageComponent } from "./page-component";

export class ContentPage extends Base {
	private readonly _content: Locator;
	private readonly _profile: PageProfile;
	private readonly _pageComponent: PageComponent;
	private readonly _contentComponents: ContentComponents;

	constructor(page: Page) {
		super(page);
		this._content = this.page.locator("main");
		this._profile = new PageProfile(this.page, this._content);
		this._pageComponent = new PageComponent(this.page, this._content);
		this._contentComponents = new ContentComponents(this.page, this._content);
	}

	get content(): Locator {
		return this._content;
	}
	get profile(): PageProfile {
		return this._profile;
	}
	get pageComponent(): PageComponent {
		return this._pageComponent;
	}
	get contentComponents(): ContentComponents {
		return this._contentComponents;
	}
}
