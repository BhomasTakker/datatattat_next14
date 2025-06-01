import { Page } from "@playwright/test";
import { HeaderPage } from "./header-page";
import { FooterPage } from "./footer-page";
import { NavigationPage } from "./navigation-page";

export class PageManager {
	private readonly page: Page;
	private readonly headerPage: HeaderPage;
	private readonly footerPage: FooterPage;
	private readonly navigationPage: NavigationPage;

	constructor(page: Page) {
		this.page = page;
		this.headerPage = new HeaderPage(page);
		this.footerPage = new FooterPage(page);
		this.navigationPage = new NavigationPage(page);
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
}
