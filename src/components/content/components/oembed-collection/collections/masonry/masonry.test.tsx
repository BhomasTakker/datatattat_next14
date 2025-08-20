import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import oembedMasonry from "./masonry";
import type { OEmbed } from "@/types/data-structures/oembed";
import { ContainerWidthOptions } from "@/components/page/components/stack/types";

// Mock the ClientOembed component
jest.mock("../../../content-oembed/client-component", () => ({
	ClientOembed: ({ html }: { html: string }) => (
		<div
			data-testid="client-oembed"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	),
}));

// Mock the styles
jest.mock("./masonry.module.scss", () => ({
	masonryGrid: "masonry-grid",
}));

// Mock the container width function
jest.mock("../../../../../../components/page/components/stack/types", () => ({
	ContainerWidthOptions: {
		XXS: "XXS",
		XS: "XS",
		SM: "SM",
		MD: "MD",
		LG: "LG",
		XL: "XL",
		XXL: "XXL",
	},
	getContainerWidth: jest.fn((size: string) => {
		const widthMap: Record<string, string> = {
			XXS: "305",
			XS: "350",
			SM: "400",
			MD: "480",
			LG: "560",
			XL: "750",
			XXL: "900",
		};
		return widthMap[size] || "480";
	}),
}));

describe("oembedMasonry", () => {
	const mockOEmbedItems: OEmbed[] = [
		{
			id: "1",
			title: "Test Tweet 1",
			type: "rich",
			version: "1.0",
			provider_name: "Twitter",
			provider_url: "https://twitter.com",
			author_name: "Test Author 1",
			author_url: "https://twitter.com/testauthor1",
			html: "<blockquote>First tweet content</blockquote>",
			width: 550,
			height: 250,
		},
		{
			id: "2",
			title: "Test Tweet 2",
			type: "rich",
			version: "1.0",
			provider_name: "Twitter",
			provider_url: "https://twitter.com",
			author_name: "Test Author 2",
			author_url: "https://twitter.com/testauthor2",
			html: "<blockquote>Second tweet content</blockquote>",
			width: 550,
			height: 300,
		},
		{
			id: "3",
			title: "Test Bluesky Post",
			type: "rich",
			version: "1.0",
			provider_name: "Bluesky",
			provider_url: "https://bsky.app",
			author_name: "Test Bluesky User",
			author_url: "https://bsky.app/profile/testuser",
			html: "<blockquote>Bluesky post content</blockquote>",
			width: 600,
			height: 200,
		},
	];

	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	describe("styles", () => {
		it("should export styles object", () => {
			expect(oembedMasonry.styles).toBeDefined();
		});
	});

	describe("renderMethod", () => {
		it("should render masonry grid with default minWidth", () => {
			const { container } = render(
				oembedMasonry.renderMethod(mockOEmbedItems, { minWidth: "MD" })
			);

			const masonryGrid = container.querySelector("ul");
			expect(masonryGrid).toBeInTheDocument();
			expect(masonryGrid).toHaveClass("masonry-grid");
			expect(masonryGrid).toHaveStyle({ "--column-width": "480px" });
		});

		it("should render all oembed items", () => {
			render(oembedMasonry.renderMethod(mockOEmbedItems, { minWidth: "MD" }));

			const oembedItems = screen.getAllByTestId("content-oembed");
			expect(oembedItems).toHaveLength(3);

			const clientOembeds = screen.getAllByTestId("client-oembed");
			expect(clientOembeds).toHaveLength(3);
		});

		it("should render items with correct content", () => {
			render(oembedMasonry.renderMethod(mockOEmbedItems, { minWidth: "MD" }));

			expect(screen.getByText("First tweet content")).toBeInTheDocument();
			expect(screen.getByText("Second tweet content")).toBeInTheDocument();
			expect(screen.getByText("Bluesky post content")).toBeInTheDocument();
		});

		it("should handle different container width options", () => {
			const testCases: Array<{
				minWidth: ContainerWidthOptions;
				expectedWidth: string;
			}> = [
				{ minWidth: "XS", expectedWidth: "350px" },
				{ minWidth: "SM", expectedWidth: "400px" },
				{ minWidth: "LG", expectedWidth: "560px" },
				{ minWidth: "XL", expectedWidth: "750px" },
			];

			testCases.forEach(({ minWidth, expectedWidth }) => {
				const { container } = render(
					oembedMasonry.renderMethod(mockOEmbedItems, { minWidth })
				);

				const masonryGrid = container.querySelector("ul");
				expect(masonryGrid).toHaveStyle({
					"--column-width": expectedWidth,
				});
			});
		});

		it("should use MD as default minWidth when not provided", () => {
			// Test when minWidth defaults to "MD"
			const props = { minWidth: undefined as any };
			const { container } = render(
				oembedMasonry.renderMethod(mockOEmbedItems, props)
			);

			const masonryGrid = container.querySelector("ul");
			expect(masonryGrid).toHaveStyle({ "--column-width": "480px" });
		});

		it("should render empty list when no collection provided", () => {
			const { container } = render(
				oembedMasonry.renderMethod([], { minWidth: "MD" })
			);

			const masonryGrid = container.querySelector("ul");
			expect(masonryGrid).toBeInTheDocument();
			expect(masonryGrid).toHaveClass("masonry-grid");

			const listItems = container.querySelectorAll("li");
			expect(listItems).toHaveLength(0);
		});

		it("should render empty list when collection is undefined", () => {
			const { container } = render(
				oembedMasonry.renderMethod(undefined as any, { minWidth: "MD" })
			);

			const masonryGrid = container.querySelector("ul");
			expect(masonryGrid).toBeInTheDocument();
			expect(masonryGrid).toHaveClass("masonry-grid");

			const listItems = container.querySelectorAll("li");
			expect(listItems).toHaveLength(0);
		});

		it("should render items only when html is present", () => {
			const itemsWithMissingHtml: OEmbed[] = [
				{
					id: "1",
					title: "Test Item 1",
					type: "rich",
					version: "1.0",
					provider_name: "Provider",
					provider_url: "https://provider.com",
					html: "<div>Has HTML</div>",
				},
				{
					id: "2",
					title: "Test Item 2",
					type: "rich",
					version: "1.0",
					provider_name: "Provider",
					provider_url: "https://provider.com",
					html: "", // Empty HTML
				},
				{
					id: "3",
					title: "Test Item 3",
					type: "rich",
					version: "1.0",
					provider_name: "Provider",
					provider_url: "https://provider.com",
					html: undefined as any, // No HTML
				},
			];

			render(
				oembedMasonry.renderMethod(itemsWithMissingHtml, { minWidth: "MD" })
			);

			// Should render 3 list items
			const oembedItems = screen.getAllByTestId("content-oembed");
			expect(oembedItems).toHaveLength(3);

			// But only 1 should have ClientOembed component (only the one with HTML)
			const clientOembeds = screen.getAllByTestId("client-oembed");
			expect(clientOembeds).toHaveLength(1);
			expect(screen.getByText("Has HTML")).toBeInTheDocument();
		});

		it("should set correct key attributes on list items", () => {
			const { container } = render(
				oembedMasonry.renderMethod(mockOEmbedItems, { minWidth: "MD" })
			);

			const listItems = container.querySelectorAll("li");
			expect(listItems[0]).toHaveAttribute("data-testid", "content-oembed");
			expect(listItems[1]).toHaveAttribute("data-testid", "content-oembed");
			expect(listItems[2]).toHaveAttribute("data-testid", "content-oembed");
		});

		it("should handle items with missing optional properties", () => {
			const minimalItems: OEmbed[] = [
				{
					id: "minimal",
					title: "Minimal Item",
					type: "rich",
					version: "1.0",
					provider_name: "Provider",
					provider_url: "https://provider.com",
					html: "<div>Minimal content</div>",
					// No optional properties like author_name, width, etc.
				},
			];

			render(oembedMasonry.renderMethod(minimalItems, { minWidth: "SM" }));

			const oembedItems = screen.getAllByTestId("content-oembed");
			expect(oembedItems).toHaveLength(1);

			expect(screen.getByText("Minimal content")).toBeInTheDocument();
		});
	});

	describe("component structure", () => {
		it("should have correct component structure", () => {
			expect(oembedMasonry).toHaveProperty("styles");
			expect(oembedMasonry).toHaveProperty("renderMethod");
			expect(typeof oembedMasonry.renderMethod).toBe("function");
		});

		it("should be consistent with other collection components", () => {
			// Ensure the masonry component follows the same pattern as stack component
			expect(oembedMasonry.renderMethod).toBeDefined();
			expect(typeof oembedMasonry.renderMethod).toBe("function");
			expect(oembedMasonry.styles).toBeDefined();
		});
	});
});
