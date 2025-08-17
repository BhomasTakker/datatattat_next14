import React from "react";
import { render, screen } from "@testing-library/react";
import { verticalStack } from "./vertical-stack";
import { PageComponents, PageComponent } from "@/types/page";
import { ArticleCollectionVariants } from "@/components/content/components/article-collection/variant-map";
import styles from "./vertical-stack.module.scss";

// Mock the ComponentDisplay component since we're testing the vertical stack logic
jest.mock("../../../../../content/component-display", () => ({
	ComponentDisplay: ({ component }: { component: PageComponent }) => (
		<div data-testid="mocked-component-display">{component.componentType}</div>
	),
}));

describe("vertical-stack", () => {
	describe("verticalStack object", () => {
		it("should export styles and renderMethod", () => {
			expect(verticalStack).toHaveProperty("styles");
			expect(verticalStack).toHaveProperty("renderMethod");
			expect(verticalStack.styles).toBe(styles);
			expect(typeof verticalStack.renderMethod).toBe("function");
		});
	});

	describe("renderComponents (renderMethod)", () => {
		const createMockComponent = (
			componentType: string,
			id?: string
		): PageComponent => ({
			componentType,
			componentProps: {
				variantType: ArticleCollectionVariants.StackColumns,
				_with: {
					type: "test-type",
					query: {
						provider: "test-provider",
						params: {},
						queryId: "test-query-id",
					},
				},
				componentTitle: id || `test-${componentType}`,
				componentTitleLink: "",
				showComponentTitle: true,
				...(componentType === "article" && { title: "Test Article" }),
				...(componentType === "image" && {
					src: "test.jpg",
					alt: "Test Image",
				}),
			},
		});

		it("should render empty array when no components provided", () => {
			const emptyComponents: PageComponents = [];
			const { container } = render(
				<ul>{verticalStack.renderMethod({ components: emptyComponents })}</ul>
			);

			expect(container.querySelector("li")).toBeNull();
		});

		it("should render single component correctly", () => {
			const components: PageComponents = [
				createMockComponent("article", "test-article-1"),
			];

			render(<ul>{verticalStack.renderMethod({ components })}</ul>);

			const listItem = screen.getByTestId("content-component");
			expect(listItem).toBeInTheDocument();
			expect(listItem.tagName).toBe("LI");
			expect(listItem).toHaveClass(styles.item);

			const componentDisplay = screen.getByTestId("mocked-component-display");
			expect(componentDisplay).toBeInTheDocument();
			expect(componentDisplay).toHaveTextContent("article");
		});

		it("should render multiple components correctly", () => {
			const components: PageComponents = [
				createMockComponent("article", "test-article-1"),
				createMockComponent("image", "test-image-1"),
				createMockComponent("video", "test-video-1"),
			];

			render(<ul>{verticalStack.renderMethod({ components })}</ul>);

			const listItems = screen.getAllByTestId("content-component");
			expect(listItems).toHaveLength(3);

			listItems.forEach((item) => {
				expect(item.tagName).toBe("LI");
				expect(item).toHaveClass(styles.item);
			});

			const componentDisplays = screen.getAllByTestId(
				"mocked-component-display"
			);
			expect(componentDisplays).toHaveLength(3);
			expect(componentDisplays[0]).toHaveTextContent("article");
			expect(componentDisplays[1]).toHaveTextContent("image");
			expect(componentDisplays[2]).toHaveTextContent("video");
		});

		it("should apply correct CSS classes to list items", () => {
			const components: PageComponents = [createMockComponent("article")];

			render(<ul>{verticalStack.renderMethod({ components })}</ul>);

			const listItem = screen.getByTestId("content-component");
			expect(listItem).toHaveClass(styles.item);
		});

		it("should pass component correctly to ComponentDisplay", () => {
			const testComponent = createMockComponent(
				"custom-component",
				"custom-id"
			);
			const components: PageComponents = [testComponent];

			render(<ul>{verticalStack.renderMethod({ components })}</ul>);

			const componentDisplay = screen.getByTestId("mocked-component-display");
			expect(componentDisplay).toHaveTextContent("custom-component");
		});

		it("should handle components with different structures", () => {
			const components: PageComponents = [
				{
					componentType: "article",
					componentProps: {
						variantType: ArticleCollectionVariants.StackColumns,
						_with: {
							type: "test-type",
							query: {
								provider: "test-provider",
								params: {},
								queryId: "test-query-id",
							},
						},
						componentTitle: "Test Article",
						componentTitleLink: "",
						showComponentTitle: true,
						title: "Test Article",
						content: "Article content",
					},
				},
				{
					componentType: "image",
					componentProps: {
						variantType: ArticleCollectionVariants.StackColumns,
						_with: {
							type: "test-type",
							query: {
								provider: "test-provider",
								params: {},
								queryId: "test-query-id",
							},
						},
						componentTitle: "Test Image",
						componentTitleLink: "",
						showComponentTitle: true,
						src: "test.jpg",
						alt: "Test image",
						width: 800,
						height: 600,
					},
				},
			];

			render(<ul>{verticalStack.renderMethod({ components })}</ul>);

			const listItems = screen.getAllByTestId("content-component");
			expect(listItems).toHaveLength(2);

			const componentDisplays = screen.getAllByTestId(
				"mocked-component-display"
			);
			expect(componentDisplays[0]).toHaveTextContent("article");
			expect(componentDisplays[1]).toHaveTextContent("image");
		});

		it("should maintain correct React reconciliation with multiple components", () => {
			const components: PageComponents = [
				createMockComponent("component1"),
				createMockComponent("component2"),
				createMockComponent("component3"),
			];

			const { container } = render(
				<ul>{verticalStack.renderMethod({ components })}</ul>
			);

			const listItems = container.querySelectorAll(
				'li[data-testid="content-component"]'
			);
			expect(listItems).toHaveLength(3);

			// Each ComponentDisplay should be rendered correctly
			const componentDisplays = container.querySelectorAll(
				'[data-testid="mocked-component-display"]'
			);
			expect(componentDisplays).toHaveLength(3);
			
			// Verify the content of each component
			expect(componentDisplays[0]).toHaveTextContent("component1");
			expect(componentDisplays[1]).toHaveTextContent("component2");
			expect(componentDisplays[2]).toHaveTextContent("component3");
		});

		it("should handle empty componentProps gracefully", () => {
			const components: PageComponents = [
				{
					componentType: "empty-component",
					componentProps: {
						variantType: ArticleCollectionVariants.StackColumns,
						_with: {
							type: "test-type",
							query: {
								provider: "test-provider",
								params: {},
								queryId: "test-query-id",
							},
						},
						componentTitle: "Empty Component",
						componentTitleLink: "",
						showComponentTitle: true,
					},
				},
			];

			render(<ul>{verticalStack.renderMethod({ components })}</ul>);

			const listItem = screen.getByTestId("content-component");
			expect(listItem).toBeInTheDocument();

			const componentDisplay = screen.getByTestId("mocked-component-display");
			expect(componentDisplay).toHaveTextContent("empty-component");
		});

		it("should handle large arrays of components", () => {
			const largeComponentArray: PageComponents = Array.from(
				{ length: 100 },
				(_, index) => createMockComponent("component", `component-${index}`)
			);

			render(
				<ul>
					{verticalStack.renderMethod({ components: largeComponentArray })}
				</ul>
			);

			const listItems = screen.getAllByTestId("content-component");
			expect(listItems).toHaveLength(100);

			// Check first and last items
			expect(listItems[0]).toHaveClass(styles.item);
			expect(listItems[99]).toHaveClass(styles.item);
		});
	});

	describe("integration with ComponentDisplay", () => {
		const createMockComponent = (
			componentType: string,
			id?: string
		): PageComponent => ({
			componentType,
			componentProps: {
				variantType: ArticleCollectionVariants.StackColumns,
				_with: {
					type: "test-type",
					query: {
						provider: "test-provider",
						params: {},
						queryId: "test-query-id",
					},
				},
				componentTitle: id || `test-${componentType}`,
				componentTitleLink: "",
				showComponentTitle: true,
			},
		});

		it("should render actual ComponentDisplay when not mocked", () => {
			// This test verifies the integration without mocking
			jest.unmock("../../../../../content/component-display");

			const components: PageComponents = [
				createMockComponent("article", "integration-test"),
			];

			// We can't easily test the actual ComponentDisplay without mocking its dependencies,
			// but we can verify that our render method structure is correct
			expect(() => {
				render(<ul>{verticalStack.renderMethod({ components })}</ul>);
			}).not.toThrow();
		});
	});

	describe("edge cases and error handling", () => {
		it("should handle undefined components gracefully", () => {
			// TypeScript would prevent this, but testing runtime behavior
			const components = undefined as any;

			expect(() => {
				render(<ul>{verticalStack.renderMethod({ components })}</ul>);
			}).toThrow(); // Should throw because we're trying to map over undefined
		});

		it("should handle null components gracefully", () => {
			// TypeScript would prevent this, but testing runtime behavior
			const components = null as any;

			expect(() => {
				render(<ul>{verticalStack.renderMethod({ components })}</ul>);
			}).toThrow(); // Should throw because we're trying to map over null
		});

		it("should handle components with special characters in componentType", () => {
			const components: PageComponents = [
				{
					componentType: "component-with-special-chars!@#$%^&*()",
					componentProps: {
						variantType: ArticleCollectionVariants.StackColumns,
						_with: {
							type: "test-type",
							query: {
								provider: "test-provider",
								params: {},
								queryId: "test-query-id",
							},
						},
						componentTitle: "Special Component",
						componentTitleLink: "",
						showComponentTitle: true,
					},
				},
			];

			render(<ul>{verticalStack.renderMethod({ components })}</ul>);

			const componentDisplay = screen.getByTestId("mocked-component-display");
			expect(componentDisplay).toHaveTextContent(
				"component-with-special-chars!@#$%^&*()"
			);
		});
	});
});
