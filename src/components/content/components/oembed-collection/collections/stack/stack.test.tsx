import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import oembedStack from "./stack";
import type { OEmbed } from "@/types/data-structures/oembed";

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
jest.mock("./stack.module.scss", () => ({
	root: "stack-root",
	list: "stack-list",
}));

describe("oembedStack", () => {
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
			height: 200,
		},
		{
			id: "3",
			title: "Test Tweet 3",
			type: "rich",
			version: "1.0",
			provider_name: "Twitter",
			provider_url: "https://twitter.com",
			html: "<blockquote>Third tweet content</blockquote>",
			width: 550,
			height: 180,
		},
	];

	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	describe("Structure and Exports", () => {
		it("exports the expected object structure", () => {
			expect(oembedStack).toHaveProperty("styles");
			expect(oembedStack).toHaveProperty("renderMethod");
			expect(typeof oembedStack.renderMethod).toBe("function");
		});

		it("has correct styles import", () => {
			expect(oembedStack.styles).toEqual({
				root: "stack-root",
				list: "stack-list",
			});
		});
	});

	describe("renderMethod", () => {
		it("renders a ul element with correct className", () => {
			const result = oembedStack.renderMethod(mockOEmbedItems, {});
			const { container } = render(result);

			const ulElement = container.querySelector("ul");
			expect(ulElement).toBeInTheDocument();
			expect(ulElement).toHaveClass("stack-list");
		});

		it("renders all oembed items as list items", () => {
			const result = oembedStack.renderMethod(mockOEmbedItems, {});
			render(result);

			const listItems = screen.getAllByTestId("content-oembed");
			expect(listItems).toHaveLength(3);
		});

		it("renders each list item with correct className and testid", () => {
			const result = oembedStack.renderMethod(mockOEmbedItems, {});
			render(result);

			const listItems = screen.getAllByTestId("content-oembed");

			listItems.forEach((item) => {
				expect(item).toHaveClass("stack-root");
				expect(item.tagName).toBe("LI");
			});
		});

		it("renders ClientOembed components with correct html", () => {
			const result = oembedStack.renderMethod(mockOEmbedItems, {});
			render(result);

			const clientOembeds = screen.getAllByTestId("client-oembed");
			expect(clientOembeds).toHaveLength(3);

			expect(clientOembeds[0]).toHaveTextContent("First tweet content");
			expect(clientOembeds[1]).toHaveTextContent("Second tweet content");
			expect(clientOembeds[2]).toHaveTextContent("Third tweet content");
		});

		it("handles empty collection array", () => {
			const result = oembedStack.renderMethod([], {});
			const { container } = render(result);

			const ulElement = container.querySelector("ul");
			expect(ulElement).toBeInTheDocument();
			expect(ulElement).toHaveClass("stack-list");
			expect(ulElement?.children).toHaveLength(0);
		});

		it("handles undefined collection array", () => {
			const result = oembedStack.renderMethod(undefined, {});
			const { container } = render(result);

			const ulElement = container.querySelector("ul");
			expect(ulElement).toBeInTheDocument();
			expect(ulElement).toHaveClass("stack-list");
			expect(ulElement?.children).toHaveLength(0);
		});

		it("handles items without html property", () => {
			const itemsWithoutHtml: OEmbed[] = [
				{
					id: "1",
					title: "Test Item",
					type: "rich",
					version: "1.0",
					provider_name: "Test Provider",
					provider_url: "https://test.com",
					html: "", // Empty html
				},
			];

			const result = oembedStack.renderMethod(itemsWithoutHtml, {});
			render(result);

			const listItems = screen.getAllByTestId("content-oembed");
			expect(listItems).toHaveLength(1);

			// Should not render ClientOembed when html is empty/falsy
			const clientOembeds = screen.queryAllByTestId("client-oembed");
			expect(clientOembeds).toHaveLength(0);
		});

		it("only renders ClientOembed when html property exists", () => {
			const mixedItems: OEmbed[] = [
				{
					id: "1",
					title: "With HTML",
					type: "rich",
					version: "1.0",
					provider_name: "Test Provider",
					provider_url: "https://test.com",
					html: "<blockquote>Has content</blockquote>",
				},
				{
					id: "2",
					title: "Without HTML",
					type: "rich",
					version: "1.0",
					provider_name: "Test Provider",
					provider_url: "https://test.com",
					html: "",
				},
			];

			const result = oembedStack.renderMethod(mixedItems, {});
			render(result);

			const listItems = screen.getAllByTestId("content-oembed");
			expect(listItems).toHaveLength(2);

			// Should only render one ClientOembed (for the item with html)
			const clientOembeds = screen.getAllByTestId("client-oembed");
			expect(clientOembeds).toHaveLength(1);
			expect(clientOembeds[0]).toHaveTextContent("Has content");
		});
	});

	describe("Component Integration", () => {
		it("renders correctly with single item", () => {
			const singleItem = [mockOEmbedItems[0]];
			const result = oembedStack.renderMethod(singleItem, {});
			const { container } = render(result);

			expect(container.querySelector("ul")).toBeInTheDocument();
			expect(screen.getAllByTestId("content-oembed")).toHaveLength(1);
			expect(screen.getAllByTestId("client-oembed")).toHaveLength(1);
		});

		it("maintains list structure with multiple items", () => {
			const result = oembedStack.renderMethod(mockOEmbedItems, {});
			const { container } = render(result);

			const ulElement = container.querySelector("ul");
			const liElements = container.querySelectorAll("li");

			expect(ulElement).toBeInTheDocument();
			expect(liElements).toHaveLength(3);

			// Each li should have the content-oembed testid
			liElements.forEach((li) => {
				expect(li).toHaveAttribute("data-testid", "content-oembed");
			});
		});

		it("passes props parameter correctly (even though not used)", () => {
			const customProps = { customProperty: "test" };

			// Should not throw error when props are passed
			expect(() => {
				const result = oembedStack.renderMethod(mockOEmbedItems, customProps);
				render(result);
			}).not.toThrow();
		});
	});

	describe("Accessibility and Structure", () => {
		it("uses semantic HTML elements", () => {
			const result = oembedStack.renderMethod(mockOEmbedItems, {});
			const { container } = render(result);

			// Should use ul/li structure for better semantics
			expect(container.querySelector("ul")).toBeInTheDocument();
			expect(container.querySelectorAll("li")).toHaveLength(3);
		});

		it("maintains proper list item hierarchy", () => {
			const result = oembedStack.renderMethod(mockOEmbedItems, {});
			const { container } = render(result);

			const ul = container.querySelector("ul");
			const lis = ul?.querySelectorAll("li");

			expect(lis).toHaveLength(3);

			// Each li should be a direct child of ul
			lis?.forEach((li) => {
				expect(li.parentElement).toBe(ul);
			});
		});
	});
});
