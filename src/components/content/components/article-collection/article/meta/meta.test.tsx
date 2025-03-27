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

const mockDetails: Details = {
	categories: ["Category1"],
	authors: ["Author1"],
	published: "2023-10-01T00:00:00Z",
	publishers: ["Publisher1"],
};

describe("Meta Component", () => {
	// it("renders categories when provided", () => {
	// 	render(<Meta styles={mockStyles} {...mockDetails} />);
	// 	const categories = screen.queryByText("Category1");

	// 	expect(categories).toBeInTheDocument();
	// 	expect(categories).toBeInTheDocument();
	// });

	// it("renders authors when provided", () => {
	// 	render(<Meta styles={mockStyles} {...mockDetails} />);
	// 	const authors = screen.queryByText("Author1");
	// 	expect(authors).toBeInTheDocument();
	// });

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

	// it("does not render categories when not provided", () => {
	// 	render(
	// 		<Meta styles={mockStyles} {...{ ...mockDetails, categories: [] }} />
	// 	);
	// 	// better test needed
	// 	const categories = screen.queryByText("Category1");
	// 	expect(categories).not.toBeInTheDocument();
	// });

	// it("does not render authors when not provided", () => {
	// 	render(<Meta styles={mockStyles} {...{ ...mockDetails, authors: [] }} />);
	// 	const authors = screen.queryByText("Author1");
	// 	expect(authors).not.toBeInTheDocument();
	// });

	it("does not render publishers when not provided", () => {
		render(
			<Meta styles={mockStyles} {...{ ...mockDetails, publishers: [] }} />
		);
		const publishers = screen.queryByText("Publisher1");
		expect(publishers).not.toBeInTheDocument();
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
