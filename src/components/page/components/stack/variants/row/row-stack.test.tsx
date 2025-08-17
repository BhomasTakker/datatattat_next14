import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { rowStack } from "./row-stack";
import { PageComponents } from "@/types/page";
import { PageStackCollectionVariants } from "@/types/components/page/stack";
import {
	ContainerHeight,
	ContainerHeightOptions,
	ContainerWidth,
	ContainerWidthOptions,
	Row,
	RowStackProps,
} from "../../types";

// Mock the ComponentDisplay component
jest.mock("../../../../../content/component-display", () => ({
	ComponentDisplay: ({ component }: { component: any }) => (
		<div data-testid="component-display">{component.componentType}</div>
	),
}));

// Mock the SCSS module
jest.mock("./row-stack.module.scss", () => ({
	item: "item",
	rowListItem: "rowListItem",
	rowList: "rowList",
}));

describe("rowStack", () => {
	// Mock components data with proper structure
	const createMockComponent = (type: string): any => ({
		componentType: type,
		componentProps: {
			variantType: "default" as any,
			_with: {
				type: "mock",
				query: {
					provider: "mock",
					params: {},
					queryId: "mock-id",
				},
			},
			componentTitle: "",
			componentTitleLink: "",
			showComponentTitle: false,
		},
	});

	const mockComponents: PageComponents = [
		createMockComponent("text"),
		createMockComponent("image"),
		createMockComponent("video"),
		createMockComponent("audio"),
	];

	const defaultRow: Row = {
		columns: 2,
		evenColumns: true,
		maxHeight: ContainerHeightOptions.MD,
		minWidth: ContainerWidthOptions.MD,
	};

	const baseProps: RowStackProps = {
		variant: PageStackCollectionVariants.RowStack,
		defaultRow,
	};

	describe("rowStack structure", () => {
		it("should have styles and renderMethod properties", () => {
			expect(rowStack).toHaveProperty("styles");
			expect(rowStack).toHaveProperty("renderMethod");
			expect(typeof rowStack.renderMethod).toBe("function");
		});
	});

	describe("renderMethod", () => {
		it("should render components with default row configuration", () => {
			const props = {
				...baseProps,
				components: mockComponents.slice(0, 2),
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			// Should create one row with 2 components
			expect(container.querySelectorAll(".rowListItem")).toHaveLength(1);
			expect(container.querySelectorAll(".item")).toHaveLength(2);
			expect(screen.getAllByTestId("component-display")).toHaveLength(2);
		});

		it("should handle empty components array", () => {
			const props = {
				...baseProps,
				components: [],
			};

			const result = rowStack.renderMethod(props);
			expect(result).toEqual([]);
		});

		it("should create multiple rows when components exceed default row columns", () => {
			const props = {
				...baseProps,
				components: mockComponents, // 4 components, 2 per row = 2 rows
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			// Should create 2 rows
			expect(container.querySelectorAll(".rowListItem")).toHaveLength(2);
			// Should have all 4 components
			expect(container.querySelectorAll(".item")).toHaveLength(4);
			expect(screen.getAllByTestId("component-display")).toHaveLength(4);
		});

		it("should apply custom row configurations based on index", () => {
			const customRow: Row = {
				columns: 3,
				evenColumns: false,
				maxHeight: ContainerHeightOptions.LG,
				minWidth: ContainerWidthOptions.SM,
				index: "0",
			};

			const props = {
				...baseProps,
				components: mockComponents.slice(0, 3),
				rows: [customRow],
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			// Should create one row with 3 components (using custom configuration)
			expect(container.querySelectorAll(".rowListItem")).toHaveLength(1);
			expect(container.querySelectorAll(".item")).toHaveLength(3);
		});

		it("should fallback to default row when no specific row config exists", () => {
			const customRow: Row = {
				columns: 1,
				evenColumns: true,
				maxHeight: ContainerHeightOptions.XL,
				minWidth: ContainerWidthOptions.XL,
				index: "1", // Only applies to second row
			};

			const props = {
				...baseProps,
				components: mockComponents, // 4 components
				rows: [customRow],
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			// First row uses default (2 columns), second row uses custom (1 column), third row uses default again
			expect(container.querySelectorAll(".rowListItem")).toHaveLength(3);
			expect(container.querySelectorAll(".item")).toHaveLength(4);
		});

		it("should render components with correct test ids and class names", () => {
			const props = {
				...baseProps,
				components: mockComponents.slice(0, 1),
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			const rowItem = container.querySelector(".rowListItem");
			const contentItem = container.querySelector(".item");
			const componentDisplay = screen.getByTestId("component-display");

			expect(rowItem).toBeInTheDocument();
			expect(contentItem).toBeInTheDocument();
			expect(contentItem).toHaveAttribute("data-testid", "content-component");
			expect(componentDisplay).toBeInTheDocument();
		});

		it("should apply inline styles for column configuration", () => {
			const props = {
				...baseProps,
				components: mockComponents.slice(0, 1),
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			const contentItem = container.querySelector(".item") as HTMLElement;
			expect(contentItem).toHaveStyle({
				minWidth: `${ContainerWidth.MD}px`, // MD width
				maxHeight: `${ContainerHeight.MD}px`, // MD height
				flex: "1", // evenColumns is true
			});
		});

		it("should handle uneven columns configuration", () => {
			const unevenRow: Row = {
				columns: 2,
				evenColumns: false,
				maxHeight: ContainerHeightOptions.SM,
				minWidth: ContainerWidthOptions.LG,
			};

			const props = {
				...baseProps,
				defaultRow: unevenRow,
				components: mockComponents.slice(0, 2),
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			const contentItems = container.querySelectorAll(
				".item"
			) as NodeListOf<HTMLElement>;
			contentItems.forEach((item) => {
				expect(item).toHaveStyle({
					flexGrow: "1", // evenColumns is false, so flexGrow instead of flex
				});
			});
		});

		it("should break early when all components are rendered", () => {
			const props = {
				...baseProps,
				components: mockComponents.slice(0, 3), // 3 components
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			// With 2 columns per row, 3 components should create 2 rows (2 + 1)
			expect(container.querySelectorAll(".rowListItem")).toHaveLength(2);
			expect(container.querySelectorAll(".item")).toHaveLength(3);
		});

		it("should handle different container widths and heights", () => {
			const smallRow: Row = {
				columns: 1,
				evenColumns: true,
				maxHeight: ContainerHeightOptions.XS,
				minWidth: ContainerWidthOptions.XS,
			};

			const props = {
				...baseProps,
				defaultRow: smallRow,
				components: mockComponents.slice(0, 1),
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			const contentItem = container.querySelector(".item") as HTMLElement;
			// expect(contentItem).toBeInTheDocument();
			// expect(contentItem).toHaveStyle("min-width: 240px");
			expect(contentItem).toHaveStyle({
				minWidth: `${ContainerWidth.XS}px`, // XS width
				maxHeight: `${ContainerHeight.XS}px`, // XS height
			});
		});

		it("should maintain component order across rows", () => {
			const props = {
				...baseProps,
				components: mockComponents,
			};

			const result = rowStack.renderMethod(props);
			render(<ul>{result}</ul>);

			const componentDisplays = screen.getAllByTestId("component-display");
			expect(componentDisplays[0]).toHaveTextContent("text");
			expect(componentDisplays[1]).toHaveTextContent("image");
			expect(componentDisplays[2]).toHaveTextContent("video");
			expect(componentDisplays[3]).toHaveTextContent("audio");
		});
	});

	describe("edge cases", () => {
		it("should handle single component", () => {
			const props = {
				...baseProps,
				components: [mockComponents[0]],
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			expect(container.querySelectorAll(".rowListItem")).toHaveLength(1);
			expect(container.querySelectorAll(".item")).toHaveLength(1);
		});

		it("should handle large number of components", () => {
			const manyComponents = Array.from({ length: 10 }, (_, i) =>
				createMockComponent(`component-${i}`)
			);

			const props = {
				...baseProps,
				components: manyComponents,
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			// 10 components with 2 per row = 5 rows
			expect(container.querySelectorAll(".rowListItem")).toHaveLength(5);
			expect(container.querySelectorAll(".item")).toHaveLength(10);
		});

		it("should handle row configuration with index as string", () => {
			const customRow: Row = {
				columns: 1,
				evenColumns: true,
				maxHeight: ContainerHeightOptions.MD,
				minWidth: ContainerWidthOptions.MD,
				index: "0",
			};

			const props = {
				...baseProps,
				components: mockComponents.slice(0, 2),
				rows: [customRow],
			};

			const result = rowStack.renderMethod(props);
			const { container } = render(<ul>{result}</ul>);

			// First row should use custom config (1 column), second row should use default (2 columns)
			expect(container.querySelectorAll(".rowListItem")).toHaveLength(2);
			expect(container.querySelectorAll(".item")).toHaveLength(2);
		});
	});
});
