import React from "react";
import { render, screen } from "@testing-library/react";
import { EditPage } from "./edit-page";

// Mock all imported modules and components
jest.mock("../../app/api/auth/[...nextauth]/options", () => ({
	options: {},
}));
jest.mock("./user-profile/user-profile", () => ({
	UserProfile: ({ user }: any) => (
		<div data-testid="user-profile">{user?.name}</div>
	),
}));
jest.mock("./header-form/header-form", () => ({
	HeaderForm: ({ headerData, user }: any) => (
		<div data-testid="header-form">
			{headerData?.header}-{user?.name}
		</div>
	),
}));
jest.mock("../../actions/page/page-actions", () => ({
	getPage: jest.fn(),
}));
jest.mock("../../actions/header/get-header", () => ({
	getMainHeader: jest.fn(),
	getSubHeaders: jest.fn(),
}));
jest.mock("../../utils/object", () => ({
	cloneDeep: (obj: any) => obj,
}));
jest.mock("../../actions/auth/check-valid-user", () => ({
	isValidUser: jest.fn(),
}));
jest.mock("../../lib/mongo/db", () => ({
	connectToMongoDB: jest.fn(),
}));
jest.mock("./page-form/page-form-container", () => ({
	PageFormContainer: ({ pageData }: any) => (
		<div data-testid="page-form">{pageData?.content}</div>
	),
}));
jest.mock("./admin/admin-nav", () => ({
	AdminNav: ({ isAdmin }: any) => (
		<nav data-testid="admin-nav">{isAdmin ? "Admin" : "Not Admin"}</nav>
	),
}));
jest.mock("./navigation/edit-navigation", () => ({
	EditNavigation: ({ route, isAdminEdit }: any) => (
		<nav data-testid="edit-navigation">
			{route}-{isAdminEdit ? "admin" : "user"}
		</nav>
	),
}));
jest.mock("./pages/user-pages", () => ({
	AdminPages: ({ user }: any) => (
		<div data-testid="admin-pages">{user?.name}</div>
	),
	UserPages: ({ user }: any) => (
		<div data-testid="user-pages">{user?.name}</div>
	),
}));
jest.mock("./utils/edit", () => ({
	getCurrentHeader: jest.fn(),
	getPageOrNew: jest.fn(),
}));

// Setup default mock implementations
const mockSessionUser = { user_id: "123", name: "Test User" };
const mockSession = { user: mockSessionUser };
const mockHeaderData = { header: "Header" };
const mockPageData = { content: "Page Content" };

beforeEach(() => {
	require("next-auth").getServerSession.mockResolvedValue(mockSession);
	require("../../actions/auth/check-valid-user").isValidUser.mockResolvedValue({
		role: "user",
	});
	require("./utils/edit").getCurrentHeader.mockResolvedValue(mockHeaderData);
	require("./utils/edit").getPageOrNew.mockResolvedValue(mockPageData);
	require("../../lib/mongo/db").connectToMongoDB.mockResolvedValue(undefined);
});

describe("EditPage", () => {
	it("renders the title and route", async () => {
		// @ts-ignore
		await EditPage({ route: "/test", title: "Edit Test" }).then((ui: any) => {
			render(ui);
			expect(screen.getByText("Edit Test")).toBeInTheDocument();
			expect(screen.getByText("Current Endpoint:")).toBeInTheDocument();
			expect(screen.getByText("/test")).toBeInTheDocument();
		});
	});

	it("renders UserProfile and UserPages for non-admin", async () => {
		// @ts-ignore
		await EditPage({ route: "/test", title: "Edit Test" }).then((ui: any) => {
			render(ui);
			expect(screen.getByTestId("user-profile")).toHaveTextContent("Test User");
			expect(screen.getByTestId("user-pages")).toHaveTextContent("Test User");
			expect(screen.queryByTestId("admin-pages")).not.toBeInTheDocument();
		});
	});

	it("renders AdminNav and AdminPages for admin", async () => {
		require("../../actions/auth/check-valid-user").isValidUser.mockResolvedValue(
			{
				role: "admin",
			}
		);
		// @ts-ignore
		await EditPage({
			route: "/admin",
			title: "Admin Edit",
			isAdminEdit: true,
		}).then((ui: any) => {
			render(ui);
			expect(screen.getByTestId("admin-nav")).toHaveTextContent("Admin");
			expect(screen.getByTestId("admin-pages")).toHaveTextContent("Test User");
			expect(screen.queryByTestId("user-pages")).not.toBeInTheDocument();
		});
	});

	it("renders HeaderForm and PageFormContainer with correct data", async () => {
		// @ts-ignore
		await EditPage({ route: "/test", title: "Edit Test" }).then((ui: any) => {
			render(ui);
			expect(screen.getByTestId("header-form")).toHaveTextContent(
				"Header-Test User"
			);
			expect(screen.getByTestId("page-form")).toHaveTextContent("Page Content");
		});
	});

	it("renders EditNavigation with correct props", async () => {
		// @ts-ignore
		await EditPage({
			route: "/test",
			title: "Edit Test",
			isAdminEdit: false,
		}).then((ui: any) => {
			render(ui);
			expect(screen.getByTestId("edit-navigation")).toHaveTextContent(
				"/test-user"
			);
		});
	});
});
