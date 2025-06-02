import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class HeaderPage extends Base {
	constructor(page: Page) {
		super(page);
	}
	// get header html element i.e.
	getHeader(): Locator {
		return this.page.locator("header");
	}
	// we should get the header 'title' button
	async getTitle(): Promise<string> {
		const header = this.getHeader();
		const h2Locator = header.locator("h2");
		const textContent = await h2Locator.textContent();
		return textContent ? textContent.trim() : "";
	}
	// get header link by route / this isn't how a user would navigate
	async getRouteLink(route: string): Promise<Locator> {
		const header = this.getHeader();

		return header.getByRole("link", { name: route });
	}
	async getUserMenu(): Promise<Locator> {
		// probably add and use aria label
		return this.page.locator('[class^="user-menu_menuButton"]');
	}

	async openUserMenu(): Promise<Locator> {
		const userMenu = await this.getUserMenu();
		await userMenu.click();
		return userMenu;
	}
}
