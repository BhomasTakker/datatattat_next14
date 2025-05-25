import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button component", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Button>Click me</Button>);
		expect(getByText("Click me")).toBeInTheDocument();
	});

	it("applies additional classes", () => {
		const { getByRole } = render(<Button classes="extra-class">Test</Button>);
		expect(getByRole("button")).toHaveClass("extra-class");
	});

	it("calls onClick handler when clicked", () => {
		const handleClick = jest.fn();
		const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);
		fireEvent.click(getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("sets the button type to 'button' by default", () => {
		const { getByRole } = render(<Button>Default Type</Button>);
		expect(getByRole("button")).toHaveAttribute("type", "button");
	});

	it("sets the button type when provided", () => {
		const { getByRole } = render(<Button type="submit">Submit</Button>);
		expect(getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("spreads additional props to the button", () => {
		const { getByRole } = render(<Button aria-label="my-button">Label</Button>);
		expect(getByRole("button")).toHaveAttribute("aria-label", "my-button");
	});

	it("renders nothing for children if not provided", () => {
		const { getByRole } = render(<Button />);
		expect(getByRole("button").textContent).toBe("");
	});
});
