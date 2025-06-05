import { Page } from "@playwright/test";
import { HeaderPage } from "./header-page";
import { FooterPage } from "./footer-page";
import { NavigationPage } from "./navigation-page";
import { ContentPage } from "./content/content-page";
import { PageProfile } from "./content/page-profile";

export class PageManager {
	private readonly page: Page;
	private readonly headerPage: HeaderPage;
	private readonly footerPage: FooterPage;
	private readonly contentPage: ContentPage;
	private readonly navigationPage: NavigationPage;

	constructor(page: Page) {
		this.page = page;
		this.headerPage = new HeaderPage(this.page);
		this.footerPage = new FooterPage(this.page);
		this.contentPage = new ContentPage(this.page);
		this.navigationPage = new NavigationPage(this.page);
	}

	get navigateTo() {
		return this.navigationPage;
	}
	get onHeaderPage() {
		return this.headerPage;
	}
	get onFooterPage() {
		return this.footerPage;
	}
	get onContentPage() {
		return this.contentPage;
	}
}
