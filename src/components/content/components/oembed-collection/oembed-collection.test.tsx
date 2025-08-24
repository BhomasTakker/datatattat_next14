import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { OembedCollection } from "./oembed-collection";
import { OembedCollectionVariants } from "./variant-map";
import type { ComponentProps } from "@/types/component";
import type { OEmbed } from "@/types/data-structures/oembed";

// Mock the variant-map
jest.mock("./variant-map", () => ({
	OembedCollectionVariants: {
		OembedStack: "oembed-stack",
	},
	VariantsMap: new Map([
		[
			"oembed-stack",
			{
				renderMethod: jest.fn((items: OEmbed[], props: any) => (
					<div data-testid="mock-render-method">
						{items.map((item, index) => (
							<div key={index} data-testid="mock-oembed-item">
								{item.title}
							</div>
						))}
					</div>
				)),
				styles: {
					root: "mock-root-styles",
				},
			},
		],
	]),
}));

// Mock the ClientOembed component
jest.mock("./content-oembed/client-component", () => ({
	ClientOembed: ({ html }: { html: string }) => (
		<div
			data-testid="client-oembed"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	),
}));

describe("OembedCollection", () => {
	const mockOEmbedItems: OEmbed[] = [
		{
			id: "1",
			title: "Test Tweet",
			type: "rich",
			version: "1.0",
			provider_name: "Twitter",
			provider_url: "https://twitter.com",
			author_name: "Test Author",
			author_url: "https://twitter.com/testauthor",
			html: "<blockquote>Test tweet content</blockquote>",
			width: 550,
			height: 250,
		},
		{
			id: "2",
			title: "Another Tweet",
			type: "rich",
			version: "1.0",
			provider_name: "Twitter",
			provider_url: "https://twitter.com",
			html: "<blockquote>Another tweet content</blockquote>",
			width: 550,
			height: 200,
		},
	];

	const createMockProps = (
		items: OEmbed[],
		script?: string,
		variantType: string = OembedCollectionVariants.OembedStack
	): ComponentProps => ({
		component: {
			componentProps: {
				variantType,
			},
		} as any,
		dataObject: {
			data: {
				items,
				script,
			},
		},
	});

	beforeEach(() => {
		// Clear any existing scripts from document.body
		const existingScripts = document.body.querySelectorAll("script");
		existingScripts.forEach((script) => script.remove());
	});

	afterEach(() => {
		cleanup();
		// Clean up any scripts added during tests
		const scripts = document.body.querySelectorAll("script");
		scripts.forEach((script) => script.remove());
		jest.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("renders the component with correct variant", () => {
			const props = createMockProps(mockOEmbedItems);
			render(<OembedCollection {...props} />);

			expect(screen.getByTestId("oembed-stack")).toBeInTheDocument();
			expect(screen.getByTestId("oembed-stack")).toHaveClass(
				"mock-root-styles"
			);
		});

		it("renders OEmbed items using the variant render method", () => {
			const props = createMockProps(mockOEmbedItems);
			render(<OembedCollection {...props} />);

			expect(screen.getByTestId("mock-render-method")).toBeInTheDocument();
			expect(screen.getAllByTestId("mock-oembed-item")).toHaveLength(2);
			expect(screen.getByText("Test Tweet")).toBeInTheDocument();
			expect(screen.getByText("Another Tweet")).toBeInTheDocument();
		});

		it("returns null when variant is not found", () => {
			const props = createMockProps(
				mockOEmbedItems,
				undefined,
				"invalid-variant"
			);
			const { container } = render(<OembedCollection {...props} />);

			expect(container.firstChild).toBeNull();
		});

		it("handles empty items array", () => {
			const props = createMockProps([]);
			render(<OembedCollection {...props} />);

			expect(screen.getByTestId("oembed-stack")).toBeInTheDocument();
			expect(screen.getByTestId("mock-render-method")).toBeInTheDocument();
			expect(screen.queryAllByTestId("mock-oembed-item")).toHaveLength(0);
		});
	});

	describe("Script Injection", () => {
		it("injects script when script prop is provided", () => {
			const testScript = "https://platform.twitter.com/widgets.js";
			const props = createMockProps(mockOEmbedItems, testScript);

			render(<OembedCollection {...props} />);

			const scripts = document.body.querySelectorAll("script");
			const addedScript = Array.from(scripts).find(
				(script) => script.src === testScript
			);

			expect(addedScript).toBeTruthy();
			expect(addedScript?.async).toBe(true);
		});

		it("does not inject script when script prop is not provided", () => {
			const props = createMockProps(mockOEmbedItems);

			render(<OembedCollection {...props} />);

			const scripts = document.body.querySelectorAll("script");
			expect(scripts).toHaveLength(0);
		});

		it("does not inject script when script prop is empty string", () => {
			const props = createMockProps(mockOEmbedItems, "");

			render(<OembedCollection {...props} />);

			const scripts = document.body.querySelectorAll("script");
			expect(scripts).toHaveLength(0);
		});

		it("removes script on component unmount", () => {
			const testScript = "https://platform.twitter.com/widgets.js";
			const props = createMockProps(mockOEmbedItems, testScript);

			const { unmount } = render(<OembedCollection {...props} />);

			// Verify script was added
			let scripts = document.body.querySelectorAll("script");
			let addedScript = Array.from(scripts).find(
				(script) => script.src === testScript
			);
			expect(addedScript).toBeTruthy();

			// Unmount component
			unmount();

			// Verify script was removed
			scripts = document.body.querySelectorAll("script");
			addedScript = Array.from(scripts).find(
				(script) => script.src === testScript
			);
			expect(addedScript).toBeFalsy();
		});
	});

	describe("Variant Integration", () => {
		it("passes items to variant render method", () => {
			const props = createMockProps(mockOEmbedItems);
			const { VariantsMap } = require("./variant-map");

			render(<OembedCollection {...props} />);

			const mockVariant = VariantsMap.get("oembed-stack");
			expect(mockVariant.renderMethod).toHaveBeenCalledWith(
				mockOEmbedItems,
				{}
			);
		});

		it("passes component props to variant render method (excluding variantType)", () => {
			const propsWithExtraComponentProps: ComponentProps = {
				component: {
					componentProps: {
						variantType: OembedCollectionVariants.OembedStack,
						customProp: "test-value",
						anotherProp: 42,
					},
				} as any,
				dataObject: {
					data: {
						items: mockOEmbedItems,
					},
				},
			};

			const { VariantsMap } = require("./variant-map");

			render(<OembedCollection {...propsWithExtraComponentProps} />);

			const mockVariant = VariantsMap.get("oembed-stack");
			expect(mockVariant.renderMethod).toHaveBeenCalledWith(mockOEmbedItems, {
				customProp: "test-value",
				anotherProp: 42,
			});
		});

		it("uses variant styles for root element", () => {
			const props = createMockProps(mockOEmbedItems);

			render(<OembedCollection {...props} />);

			const rootElement = screen.getByTestId("oembed-stack");
			expect(rootElement).toHaveClass("mock-root-styles");
		});
	});

	describe("Data Object Structure", () => {
		it("handles missing data object gracefully", () => {
			const propsWithNoData: ComponentProps = {
				component: {
					componentProps: {
						variantType: OembedCollectionVariants.OembedStack,
					},
				} as any,
				dataObject: {
					data: undefined as any,
				},
			};

			// This should not throw an error
			expect(() => {
				render(<OembedCollection {...propsWithNoData} />);
			}).not.toThrow();
		});

		it("handles missing items in data object", () => {
			const propsWithNoItems: ComponentProps = {
				component: {
					componentProps: {
						variantType: OembedCollectionVariants.OembedStack,
					},
				} as any,
				dataObject: {
					data: {
						script: "https://test.com/script.js",
					} as any,
				},
			};

			const { VariantsMap } = require("./variant-map");

			render(<OembedCollection {...propsWithNoItems} />);

			const mockVariant = VariantsMap.get("oembed-stack");
			expect(mockVariant.renderMethod).toHaveBeenCalledWith([], {});
		});
	});

	describe("Multiple Script Injection", () => {
		it("handles multiple component instances with different scripts", () => {
			const script1 = "https://platform.twitter.com/widgets.js";
			const script2 = "https://www.instagram.com/embed.js";

			const props1 = createMockProps(mockOEmbedItems, script1);
			const props2 = createMockProps(mockOEmbedItems, script2);

			const { unmount: unmount1 } = render(<OembedCollection {...props1} />);
			const { unmount: unmount2 } = render(<OembedCollection {...props2} />);

			// Both scripts should be present
			const scripts = document.body.querySelectorAll("script");
			expect(scripts).toHaveLength(2);

			const script1Element = Array.from(scripts).find((s) => s.src === script1);
			const script2Element = Array.from(scripts).find((s) => s.src === script2);

			expect(script1Element).toBeTruthy();
			expect(script2Element).toBeTruthy();

			// Unmount first component
			unmount1();

			// First script should be removed, second should remain
			const remainingScripts = document.body.querySelectorAll("script");
			expect(remainingScripts).toHaveLength(1);
			expect(remainingScripts[0].src).toBe(script2);

			// Unmount second component
			unmount2();

			// All scripts should be removed
			const finalScripts = document.body.querySelectorAll("script");
			expect(finalScripts).toHaveLength(0);
		});
	});

	describe("Error Handling", () => {
		it("handles invalid component props structure", () => {
			const propsWithInvalidComponentProps: ComponentProps = {
				component: {
					componentProps: null as any,
				} as any,
				dataObject: {
					data: {
						items: mockOEmbedItems,
					},
				},
			};

			// Should not throw and should return null due to missing variantType
			const { container } = render(
				<OembedCollection {...propsWithInvalidComponentProps} />
			);
			expect(container.firstChild).toBeNull();
		});

		it.skip("handles script injection errors gracefully", () => {
			// Mock document.createElement to throw an error
			// but this will always throw an error - even if we don't call the function
			// because the function will get called when we render any jsx?
			const originalCreateElement = document.createElement;
			const mockCreateElement = jest.fn(() => {
				throw new Error("Failed to create script element");
			});
			document.createElement = mockCreateElement;

			const props = createMockProps(
				mockOEmbedItems,
				"https://test.com/script.js"
			);

			// Should not throw despite the error in script creation
			expect(() => {
				render(<OembedCollection {...props} />);
			}).not.toThrow();

			// Restore original method
			document.createElement = originalCreateElement;
		});
	});
});
