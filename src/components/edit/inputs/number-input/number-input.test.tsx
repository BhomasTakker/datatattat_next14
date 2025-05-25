import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { NumberInput } from "./number-input";
import { EditInputs } from "../inputs";

const renderWithForm = (ui: React.ReactElement, defaultValues = {}) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm({ defaultValues });
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(ui, { wrapper: Wrapper });
};

describe("NumberInput", () => {
	it("renders with label and input", () => {
		renderWithForm(
			<NumberInput id="age" label="Age" type={EditInputs.number} />
		);
		expect(screen.getByLabelText("Age")).toBeInTheDocument();
		expect(screen.getByRole("spinbutton")).toBeInTheDocument();
	});

	it("sets defaultValue from props", () => {
		renderWithForm(
			<NumberInput
				id="quantity"
				label="Quantity"
				defaultValue={5}
				type={EditInputs.number}
			/>
		);
		const input = screen.getByLabelText("Quantity") as HTMLInputElement;
		expect(input.value).toBe("5");
	});

	it("sets defaultValue from form context", () => {
		renderWithForm(
			<NumberInput id="score" label="Score" type={EditInputs.number} />,
			{ score: 42 }
		);
		const input = screen.getByLabelText("Score") as HTMLInputElement;
		expect(input.value).toBe("42");
	});

	it("applies min, max, and step props", () => {
		renderWithForm(
			<NumberInput
				id="points"
				label="Points"
				min={1}
				max={10}
				step={2}
				type={EditInputs.number}
			/>
		);
		const input = screen.getByLabelText("Points") as HTMLInputElement;
		expect(input.min).toBe("1");
		expect(input.max).toBe("10");
		expect(input.step).toBe("2");
	});

	it("disables input when disabled prop is true", () => {
		renderWithForm(
			<NumberInput
				id="disabled"
				label="Disabled"
				disabled
				type={EditInputs.number}
			/>
		);
		const input = screen.getByLabelText("Disabled") as HTMLInputElement;
		expect(input).toBeDisabled();
	});

	it("sets required attribute", () => {
		renderWithForm(
			<NumberInput
				id="req"
				label="Required"
				required
				type={EditInputs.number}
			/>
		);
		const input = screen.getByLabelText("Required") as HTMLInputElement;
		expect(input).toBeRequired();
	});

	it("does not set required when required is false", () => {
		renderWithForm(
			<NumberInput
				id="notreq"
				label="Not Required"
				required={false}
				type={EditInputs.number}
			/>
		);
		const input = screen.getByLabelText("Not Required") as HTMLInputElement;
		expect(input).not.toBeRequired();
	});
});
