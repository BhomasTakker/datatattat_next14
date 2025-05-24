import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserHome, { generateMetadata } from "./page";
import { getPage } from "@/actions/page/page-actions";
import { PATHS } from "@/lib/routing/paths";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";
import { User } from "@/models/User";

// Mock dependencies
jest.mock("../../../../actions/page/page-actions", () => ({
	getPage: jest.fn(),
}));
jest.mock("../../../../lib/metadata/generate-metadata", () => ({
	generateMetaDataFromPage: jest.fn(),
}));
jest.mock("../../../../components/page/page-display", () => ({
	PageDisplay: ({ page }: any) => (
		<div data-testid="page-display">{page?.title}</div>
	),
}));
jest.mock("../../../../components/header/main-header", () => ({
	MainHeader: ({ route }: any) => (
		<div data-testid="main-header">{route.join("/")}</div>
	),
}));
jest.mock("../../../page.module.scss", () => ({
	page: "mocked-page-class",
}));

const mockParams = Promise.resolve({
	username: "testuser",
	route: ["section", "subsection"],
});

describe("UserHome page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders 404 if page is not found", async () => {
		(getPage as jest.Mock).mockResolvedValueOnce(null);

		// Await the promise for params
		const props = { params: mockParams };
		const { findByText } = render(await UserHome(props));
		expect(await findByText("404")).toBeInTheDocument();
	});

	it("renders MainHeader and PageDisplay when page is found", async () => {
		(getPage as jest.Mock).mockResolvedValueOnce({ title: "Test Page" });

		const props = { params: mockParams };
		render(await UserHome(props));

		await waitFor(() => {
			expect(screen.getByTestId("main-header")).toHaveTextContent(
				"users/testuser/section/subsection"
			);
			expect(screen.getByTestId("page-display")).toHaveTextContent("Test Page");
			expect(screen.getByText("Test Page")).toBeInTheDocument();
		});
	});

	describe("Snaps", () => {
		it("renders Page Unchanged", async () => {
			const props = { params: mockParams };
			const { container } = render(await UserHome(props));
			expect(container).toMatchSnapshot();
		});
	});
});

describe("generateMetadata", () => {
	it("calls generateMetaDataFromPage with correct path", async () => {
		(generateMetaDataFromPage as jest.Mock).mockResolvedValueOnce({
			title: "Meta Title",
		});

		const params = Promise.resolve({
			username: "user1",
			route: ["foo", "bar"],
		});

		const metadata = await generateMetadata({ params });
		expect(generateMetaDataFromPage).toHaveBeenCalledWith(
			`${PATHS.user("user1")}/foo/bar`
		);
		expect(metadata).toEqual({ title: "Meta Title" });
	});
});
