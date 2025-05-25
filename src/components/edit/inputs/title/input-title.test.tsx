import React from "react";
import { render, screen } from "@testing-library/react";
import { InputTitle } from "./input-title";
import styles from "./input-title.module.scss";
import { EditInputs } from "../inputs";

describe("InputTitle", () => {
	it("renders the title text", () => {
		render(<InputTitle title="Test Title" type={EditInputs.title} />);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	it("uses the default header (h2) when not specified", () => {
		render(<InputTitle title="Default Header" type={EditInputs.title} />);
		const header = screen.getByText("Default Header");
		expect(header.tagName).toBe("H2");
	});

	it("renders with a custom header element", () => {
		render(
			<InputTitle title="Custom Header" header="h3" type={EditInputs.title} />
		);
		const header = screen.getByText("Custom Header");
		expect(header.tagName).toBe("H3");
	});

	it("applies the correct size class", () => {
		render(
			<InputTitle title="Small Title" size="small" type={EditInputs.title} />
		);
		const header = screen.getByText("Small Title");
		expect(header).toHaveClass(styles.title);
		expect(header).toHaveClass(styles.small);
	});

	it("applies the correct default size class (medium)", () => {
		render(<InputTitle title="Medium Title" type={EditInputs.title} />);
		const header = screen.getByText("Medium Title");
		expect(header).toHaveClass(styles.medium);
	});

	it("applies both title and size classes", () => {
		render(
			<InputTitle title="Large Title" size="large" type={EditInputs.title} />
		);
		const header = screen.getByText("Large Title");
		expect(header.className).toContain(styles.title);
		expect(header.className).toContain(styles.large);
	});
});
