import { Page } from "@playwright/test";
import { PageManager } from "./page-manager";
import { Base } from "./base";
// https://www.udemy.com/course/playwright-from-zero-to-hero/learn/lecture/39699270#overview

export class NavigationPage extends Base {
	constructor(page: Page) {
		super(page);
	}

	async browserNavigateToContentPage(route: string = "") {
		await this.page.goto(`https://datatattat.com/${route}`);
	}

	async navigateToHome() {}

	// via Nav?
	async navigateToUK() {
		const pm = new PageManager(this.page);
		const ukLink = await pm.onHeaderPage.getRouteLink("uk");
		await ukLink.click();
	}

	// How would we be able to sign in?
	async navigateToSignIn() {}
}
