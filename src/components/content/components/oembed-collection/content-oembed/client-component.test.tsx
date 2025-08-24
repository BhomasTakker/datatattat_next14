import React from "react";
import { render, screen } from "@testing-library/react";
import { ClientOembed } from "./client-component";

describe("ClientOembed", () => {
	it("renders the provided HTML content", () => {
		const html = "<p>Test Oembed Content</p>";
		render(<ClientOembed html={html} />);
		expect(screen.getByText("Test Oembed Content")).toBeInTheDocument();
	});

	it("renders HTML with tags correctly", () => {
		const html = "<div><span>Nested Content</span></div>";
		render(<ClientOembed html={html} />);
		expect(screen.getByText("Nested Content")).toBeInTheDocument();
	});

	it("renders empty div when html is empty", () => {
		render(<ClientOembed html="" />);
		const container = screen.getByTestId("client-oembed");
		expect(container.innerHTML).toBe("");
	});

	it("sets inner HTML using dangerouslySetInnerHTML", () => {
		const html = "<b>Bold Text</b>";
		render(<ClientOembed html={html} />);
		const boldElement = screen.getByText("Bold Text");
		expect(boldElement.tagName).toBe("B");
	});
});
