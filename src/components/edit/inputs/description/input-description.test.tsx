import React from "react";
import { render, screen } from "@testing-library/react";
import { InputDescription } from "./input-description";
import { EditInputs } from "../inputs";

describe("InputDescription", () => {
	it("renders the provided text", () => {
		render(
			<InputDescription text="Test description" type={EditInputs.description} />
		);
		expect(screen.getByText("Test description")).toBeInTheDocument();
	});

	it("applies the correct className", () => {
		render(
			<InputDescription
				text="Styled description"
				type={EditInputs.description}
			/>
		);
		const p = screen.getByText("Styled description");
		expect(p.className).toMatch(/description/);
	});

	it("renders empty text gracefully", () => {
		render(<InputDescription text="" type={EditInputs.description} />);
		const element = screen.getByTestId("input-description");
		expect(element).toBeInTheDocument();
		expect(element.textContent).toBe("");
	});

	it("renders special characters correctly", () => {
		const specialText = "Description with !@#$%^&*()";
		render(
			<InputDescription text={specialText} type={EditInputs.description} />
		);
		expect(screen.getByText(specialText)).toBeInTheDocument();
	});
});
