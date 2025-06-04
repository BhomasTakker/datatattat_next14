import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class HeaderPage extends Base {
	private readonly _header: Locator;
	private readonly _menuButton: Locator;
	private readonly _homeLogoButton: Locator;
	private readonly _donateButton: Locator;
	private readonly _title: Locator;

	constructor(page: Page) {
		super(page);
		this._header = this.page.locator("header");
		this._menuButton = this._header.locator('[class^="user-menu_menuButton"]');
		this._homeLogoButton = this._header.locator('a[aria-label="Home"]');
		this._donateButton = this._header.locator(
			'a[href="https://ko-fi.com/Z8Z81DQMUH"]'
		);
		this._title = this._header.getByTestId("datatattat");
	}
	// get header html element i.e.
	get header(): Locator {
		return this._header;
	}
	// we should get the header 'title' button
	get title(): Locator {
		return this._title;
	}

	async getRouteLink(route: string): Promise<Locator> {
		return this.header.getByRole("link", { name: route });
	}
	async getUserMenu(): Promise<Locator> {
		// probably add and use aria label
		return this._menuButton;
	}

	async getUserHomeLogoButton(): Promise<Locator> {
		return this._homeLogoButton;
	}

	async getDonateButton(): Promise<Locator> {
		return this._donateButton;
	}

	async openUserMenu(): Promise<Locator> {
		const userMenu = await this.getUserMenu();
		await userMenu.click();
		return userMenu;
	}
}
