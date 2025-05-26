import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Click, ClickProps } from "./click";

describe("Click component", () => {
	it("renders children", () => {
		const { getByText } = render(<Click onClick={() => {}}>Hello</Click>);
		expect(getByText("Hello")).toBeInTheDocument();
	});

	it("calls onClick when clicked", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Click onClick={handleClick}>Click me</Click>);
		fireEvent.click(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("does not throw if onClick is not provided (TypeScript should prevent this)", () => {
		// @ts-expect-error
		expect(() => render(<Click>Missing onClick</Click>)).not.toThrow();
	});

	it("renders multiple children", () => {
		const { getByText } = render(
			<Click onClick={() => {}}>
				<span>Child 1</span>
				<span>Child 2</span>
			</Click>
		);
		expect(getByText("Child 1")).toBeInTheDocument();
		expect(getByText("Child 2")).toBeInTheDocument();
	});
});
