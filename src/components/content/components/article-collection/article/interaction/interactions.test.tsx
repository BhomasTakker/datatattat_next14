import React from "react";
import { render } from "@testing-library/react";
import { Interaction } from "./interactions";
import { InteractionsOptions } from "./interactions-map";

// Mock InteractionsMap and its components
jest.mock("./interactions-map", () => {
	return {
		InteractionsOptions: {
			NAVIGATE: "NAVIGATE",
			CLICK: "CLICK",
		},
		// @ts-expect-error - No Map?????
		InteractionsMap: new Map([
			[
				"NAVIGATE",
				({ children, to }: { children: React.ReactNode; to: string }) => (
					<a href={to} data-testid="navigate">
						{children}
					</a>
				),
			],
			[
				"CLICK",
				({
					children,
					onClick,
				}: {
					children: React.ReactNode;
					onClick: () => void;
				}) => (
					<button onClick={onClick} data-testid="click">
						{children}
					</button>
				),
			],
		]),
	};
});

describe("Interaction", () => {
	it("renders children directly if type is not in InteractionsMap", () => {
		const { getByText } = render(
			// @ts-expect-error - Testing unknown type
			<Interaction type={"UNKNOWN" as InteractionsOptions}>
				No interaction
			</Interaction>
		);
		expect(getByText("No interaction")).toBeInTheDocument();
	});

	it("renders Navigate interaction", () => {
		const { getByTestId } = render(
			// @ts-expect-error - Mock
			<Interaction type="NAVIGATE" to="/test">
				Navigate here
			</Interaction>
		);
		const link = getByTestId("navigate");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/test");
		expect(link).toHaveTextContent("Navigate here");
	});

	it("renders Click interaction and triggers onClick", () => {
		const handleClick = jest.fn();
		const { getByTestId } = render(
			// @ts-expect-error - Mock
			<Interaction type="CLICK" onClick={handleClick}>
				Click me
			</Interaction>
		);
		const button = getByTestId("click");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click me");
		button.click();
		expect(handleClick).toHaveBeenCalled();
	});
});
