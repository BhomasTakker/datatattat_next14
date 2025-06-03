import { Locator, Page } from "@playwright/test";
import { Base } from "./base";

export class HeaderPage extends Base {
	private readonly header: Locator;
	private readonly menuButton: Locator;
	private readonly homeLogoButton: Locator;
	private readonly donateButton: Locator;
	private readonly title: Locator;

	constructor(page: Page) {
		super(page);
		this.header = this.page.locator("header");
		this.menuButton = this.header.locator('[class^="user-menu_menuButton"]');
		this.homeLogoButton = this.header.locator('a[aria-label="Home"]');
		this.donateButton = this.header.locator(
			'a[href="https://ko-fi.com/Z8Z81DQMUH"]'
		);
		this.title = this.header.getByTestId("datatattat");
	}
	// get header html element i.e.
	getHeader(): Locator {
		return this.header;
	}
	// we should get the header 'title' button
	getTitle(): Locator {
		return this.title;
	}

	async getRouteLink(route: string): Promise<Locator> {
		return this.header.getByRole("link", { name: route });
	}
	async getUserMenu(): Promise<Locator> {
		// probably add and use aria label
		return this.menuButton;
	}

	async getUserHomeLogoButton(): Promise<Locator> {
		return this.homeLogoButton;
	}

	async getDonateButton(): Promise<Locator> {
		return this.donateButton;
	}

	async openUserMenu(): Promise<Locator> {
		const userMenu = await this.getUserMenu();
		await userMenu.click();
		return userMenu;
	}
}
