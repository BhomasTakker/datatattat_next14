import React from "react";
import { render, screen } from "@testing-library/react";
import UserHome, { generateMetadata } from "./page";
import { getPage } from "@/actions/page/page-actions";
import { PATHS } from "@/lib/routing/paths";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";

// Mock dependencies
jest.mock("../../../actions/page/page-actions");
jest.mock("../../../lib/routing/paths", () => ({
	PATHS: {
		user: (username: string) => `/users/${username}`,
	},
}));
jest.mock("../../../lib/metadata/generate-metadata");
jest.mock("../../../components/page/page-display", () => ({
	PageDisplay: ({ page }: any) => (
		<div data-testid="page-display">{page?.title}</div>
	),
}));
jest.mock("../../../components/header/main-header", () => ({
	MainHeader: ({ route }: any) => (
		<div data-testid="main-header">{route.join("/")}</div>
	),
}));
jest.mock("../../page.module.scss", () => ({
	page: "mocked-page-class",
}));

describe("UserHome", () => {
	const username = "testuser";
	const params = Promise.resolve({ username });

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders 404 if page is not found", async () => {
		(getPage as jest.Mock).mockResolvedValueOnce(null);

		// @ts-ignore
		const { findByText } = render(await UserHome({ params }));
		expect(await findByText("404")).toBeInTheDocument();
	});

	it("renders MainHeader and PageDisplay when page exists", async () => {
		const mockPage = { title: "Test Page" };
		(getPage as jest.Mock).mockResolvedValueOnce(mockPage);

		// @ts-ignore
		const { findByTestId } = render(await UserHome({ params }));
		expect(await findByTestId("main-header")).toHaveTextContent(
			"users/testuser"
		);
		expect(await findByTestId("page-display")).toHaveTextContent("Test Page");
	});

	describe("Snaps", () => {
		it("renders Page Unchanged", async () => {
			const mockPage = { title: "Test Page" };
			(getPage as jest.Mock).mockResolvedValueOnce(mockPage);
			const { container } = render(await UserHome({ params }));
			expect(container).toMatchSnapshot();
		});
	});
});

describe("generateMetadata", () => {
	it("calls generateMetaDataFromPage with correct path", async () => {
		const mockMetadata = { title: "Meta" };
		(generateMetaDataFromPage as jest.Mock).mockResolvedValueOnce(mockMetadata);

		const params = Promise.resolve({ username: "metauser" });
		const result = await generateMetadata({ params });

		expect(generateMetaDataFromPage).toHaveBeenCalledWith("/users/metauser");
		expect(result).toBe(mockMetadata);
	});
});
