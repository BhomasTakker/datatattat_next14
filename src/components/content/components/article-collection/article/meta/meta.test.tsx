import React from "react";
import { render, screen } from "@testing-library/react";
import { Meta } from "./meta";
import { StyleSheet } from "@/types/css";
import { Details } from "@/types/data-structures/collection/base";

const mockStyles: StyleSheet = {
	meta: "meta",
	categories: "categories",
	authors: "authors",
	publishers: "publishers",
};

const mockDetails = {
	published: "2023-10-01T00:00:00Z",
	publisher: "Publisher1",
};

describe("Meta Component", () => {
	it("renders publishers when provided", () => {
		render(<Meta styles={mockStyles} {...mockDetails} />);
		const publishers = screen.queryByText("Publisher1");
		expect(publishers).toBeInTheDocument();
	});

	it("renders expected time when provided", () => {
		render(<Meta styles={mockStyles} {...mockDetails} />);
		const published = screen.getByText("1 Oct 2023");
		expect(published).toBeInTheDocument();
	});

	it("does not render publishers when not provided", () => {
		render(
			<Meta styles={mockStyles} {...{ ...mockDetails, publisher: undefined }} />
		);
		const publisher = screen.queryByTestId("publisher");
		expect(publisher).not.toBeInTheDocument();
	});

	it("does not render published time when not provided", () => {
		render(<Meta styles={mockStyles} {...{ ...mockDetails, published: "" }} />);
		const published = screen.queryByText("2023-10-01T00:00:00Z");
		expect(published).not.toBeInTheDocument();
	});

	it("renders correctly with all props", () => {
		const { container } = render(<Meta styles={mockStyles} {...mockDetails} />);
		expect(container).toMatchSnapshot();
	});
});
