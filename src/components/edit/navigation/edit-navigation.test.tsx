import React from "react";
import { render, screen } from "@testing-library/react";
import { EditNavigation } from "./edit-navigation";
import { getMainHeader, getSubHeaders } from "@/actions/header/get-header";

// Mock next/link
jest.mock("next/link", () => ({ children, href }: any) => (
	<a href={href}>{children}</a>
));

// Mock styles
jest.mock("./edit-navigation.module.scss", () => ({
	header: "header",
}));

// Mock NavigationMenu and SubHeaders
jest.mock("../../../components/header/navigation/navigation-menu", () => ({
	NavigationMenu: ({ items, prefix }: any) => (
		<nav data-testid="navigation-menu">{JSON.stringify({ items, prefix })}</nav>
	),
}));
jest.mock("../../../components/header/sub-headers", () => ({
	SubHeaders: ({ headersArray, prefix }: any) => (
		<div data-testid="sub-headers">
			{JSON.stringify({ headersArray, prefix })}
		</div>
	),
}));

const adminPath = jest.fn(() => "/admin");
const editPath = jest.fn(() => "/edit");

jest.mock("../../../lib/routing/paths", () => ({
	PATHS: {
		admin: () => adminPath(),
		edit: () => editPath(),
	},
}));

// Mock getMainHeader and getSubHeaders
const mockMainHeader = {
	nav: [{ label: "Dashboard", href: "/admin/dashboard" }],
};
const mockSubHeaders = [{ label: "Sub1", href: "/edit/sub1" }];

jest.mock("../../../actions/header/get-header", () => ({
	getMainHeader: jest.fn(),
	getSubHeaders: jest.fn(),
}));

describe("EditNavigation", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(getMainHeader as jest.Mock).mockResolvedValue(mockMainHeader);
		(getSubHeaders as jest.Mock).mockResolvedValue(mockSubHeaders);
	});

	it("renders user home link and sub headers for non-admin", async () => {
		render(
			await EditNavigation({
				route: "/edit",
				isAdminEdit: false,
			})
		);
		expect(await screen.findByText("User Home")).toBeInTheDocument();
		expect(screen.queryByTestId("navigation-menu")).not.toBeInTheDocument();
		expect(await screen.findByTestId("sub-headers")).toBeInTheDocument();
		expect(editPath).toHaveBeenCalled();
		expect(adminPath).not.toHaveBeenCalled();
	});

	it("renders admin home link and navigation menu for admin", async () => {
		render(
			await EditNavigation({
				route: "/admin",
				isAdminEdit: true,
			})
		);
		expect(await screen.findByText("Home")).toBeInTheDocument();
		expect(await screen.findByTestId("navigation-menu")).toBeInTheDocument();
		expect(await screen.findByTestId("sub-headers")).toBeInTheDocument();
		expect(adminPath).toHaveBeenCalled();
	});

	it("does not render sub headers if subHeaders is empty", async () => {
		(getSubHeaders as jest.Mock).mockResolvedValue([]);
		render(
			await EditNavigation({
				route: "/edit",
				isAdminEdit: false,
			})
		);
		expect(await screen.findByText("User Home")).toBeInTheDocument();
		expect(screen.queryByTestId("sub-headers")).not.toBeInTheDocument();
	});

	it("does not render sub headers if subHeaders is undefined", async () => {
		(getSubHeaders as jest.Mock).mockResolvedValue(undefined);
		render(
			await EditNavigation({
				route: "/edit",
				isAdminEdit: false,
			})
		);
		expect(await screen.findByText("User Home")).toBeInTheDocument();
		expect(screen.queryByTestId("sub-headers")).not.toBeInTheDocument();
	});
});
