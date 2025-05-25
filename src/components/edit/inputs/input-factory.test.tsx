import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFactory } from "./input-factory";

jest.mock("./inputs", () => {
	return {
		inputMap: new Map([
			[
				"mock",
				(props: any) => <div data-testid="mock-component">{props.label}</div>,
			],
		]),
	};
});

describe("InputFactory", () => {
	it("renders the correct component from inputMap", () => {
		const data = { type: "mock", label: "Test Label" };
		render(<InputFactory data={data} />);
		expect(screen.getByTestId("mock-component")).toHaveTextContent(
			"Test Label"
		);
	});

	it("returns null if component type is not found", () => {
		const data = { type: "unknown", label: "Should not render" };
		const { container } = render(<InputFactory data={data} />);
		expect(container.firstChild).toBeNull();
	});

	it("passes all props to the rendered component", () => {
		const data = { type: "mock", label: "Another Label", extra: "extra-prop" };
		render(<InputFactory data={data} />);
		expect(screen.getByTestId("mock-component")).toHaveTextContent(
			"Another Label"
		);
	});
});
