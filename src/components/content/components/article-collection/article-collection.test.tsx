import React from "react";
import { render, screen } from "@testing-library/react";
import { ArticleCollection } from "./article-collection";
import { VariantsMap } from "./variant-map";
import { Collection } from "@/types/data-structures/collection/collection";

// Mock VariantsMap
jest.mock("./variant-map", () => ({
	VariantsMap: {
		get: jest.fn(),
	},
}));

const mockArticles = [
	{ id: "1", title: "Article 1" },
	{ id: "2", title: "Article 2" },
];

const mockCollection: Collection = {
	// @ts-expect-error - Mocking for test purposes
	items: mockArticles,
	// add other required properties if needed
};

const baseComponentProps = {
	variantType: "mockVariant",
	someOtherProp: "value",
};

const mockRenderMethod = jest.fn(() => (
	<div data-testid="mock-render">Rendered Articles</div>
));
const mockStyles = { root: "mock-root-class" };

const defaultProps = {
	component: {
		componentProps: baseComponentProps,
	},
	dataObject: {
		data: mockCollection,
	},
};

describe("ArticleCollection", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders null if variantObject is not found", () => {
		(VariantsMap.get as jest.Mock).mockReturnValue(undefined);

		// @ts-expect-error - Mock data
		const { container } = render(<ArticleCollection {...defaultProps} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders the correct variant with articles and props", () => {
		(VariantsMap.get as jest.Mock).mockReturnValue({
			renderMethod: mockRenderMethod,
			styles: mockStyles,
		});

		// @ts-expect-error - Mock data
		render(<ArticleCollection {...defaultProps} />);
		expect(mockRenderMethod).toHaveBeenCalledWith(
			mockArticles,
			expect.objectContaining({ someOtherProp: "value" })
		);
		expect(screen.getByTestId("mock-render")).toBeInTheDocument();
		expect(screen.getByTestId("mock-render").parentElement).toHaveClass(
			"mock-root-class"
		);
	});

	it("passes the correct articles from dataObject", () => {
		(VariantsMap.get as jest.Mock).mockReturnValue({
			renderMethod: mockRenderMethod,
			styles: mockStyles,
		});

		// @ts-expect-error - Mock data
		render(<ArticleCollection {...defaultProps} />);
		// @ts-expect-error - I don't understand what is going on here - redo.
		expect(mockRenderMethod.mock.calls[0][0]).toBe(mockArticles);
	});

	it("passes the correct rest props to renderMethod", () => {
		(VariantsMap.get as jest.Mock).mockReturnValue({
			renderMethod: mockRenderMethod,
			styles: mockStyles,
		});

		// @ts-expect-error - Mock data
		render(<ArticleCollection {...defaultProps} />);
		// @ts-expect-error - I don't understand what is going on here - redo.
		const restProps = mockRenderMethod.mock.calls[0][1];
		expect(restProps).toEqual({ someOtherProp: "value" });
		// expect(restProps.variantType).toBeUndefined();
	});
});
