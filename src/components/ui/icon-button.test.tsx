import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { IconButton } from "./icon-button";

// Mock icon component
const MockIcon: React.FC = () => <svg data-testid="mock-icon" />;

describe("IconButton", () => {
	it("renders the icon", () => {
		const { getByTestId } = render(
			<IconButton icon={MockIcon} onClick={() => {}} />
		);
		expect(getByTestId("mock-icon")).toBeInTheDocument();
	});

	it("calls onClick when clicked", () => {
		const handleClick = jest.fn();
		const { getByRole } = render(
			<IconButton icon={MockIcon} onClick={handleClick} />
		);
		fireEvent.click(getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("sets the button type to 'button' by default", () => {
		const { getByRole } = render(
			<IconButton icon={MockIcon} onClick={() => {}} />
		);
		expect(getByRole("button")).toHaveAttribute("type", "button");
	});

	it("accepts and sets a custom button type", () => {
		const { getByRole } = render(
			<IconButton icon={MockIcon} onClick={() => {}} type="submit" />
		);
		expect(getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("applies the correct className from styles", () => {
		const { getByRole } = render(
			<IconButton icon={MockIcon} onClick={() => {}} />
		);
		expect(getByRole("button").className).toContain("icon");
	});

	describe("Snaps", () => {
		it("renders IconButton unchanged", async () => {
			const { container } = render(
				<IconButton icon={MockIcon} onClick={() => {}} />
			);
			expect(container).toMatchSnapshot();
		});
	});
});
