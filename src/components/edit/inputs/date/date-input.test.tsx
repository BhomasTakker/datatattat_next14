import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { DateInput } from "./date-input";
import { EditInputs } from "../inputs";

const renderWithForm = (ui: React.ReactElement, defaultValues = {}) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm({ defaultValues });
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(ui, { wrapper: Wrapper });
};

describe("DateInput", () => {
	const baseProps = {
		id: "test-date",
		label: "Test Date",
	};

	it("renders label and input", () => {
		renderWithForm(<DateInput type={EditInputs.date} {...baseProps} />);
		expect(screen.getByLabelText("Test Date")).toBeInTheDocument();
		expect(screen.getByTestId("date-input")).toBeInTheDocument();
	});

	it("applies required attribute", () => {
		renderWithForm(
			<DateInput {...baseProps} required={true} type={EditInputs.date} />
		);
		expect(screen.getByLabelText("Test Date")).toBeRequired();
	});

	it("applies disabled attribute", () => {
		renderWithForm(
			<DateInput {...baseProps} disabled={true} type={EditInputs.date} />
		);
		expect(screen.getByLabelText("Test Date")).toBeDisabled();
	});

	it("applies min and max attributes", () => {
		renderWithForm(
			<DateInput
				{...baseProps}
				min="2023-01-01"
				max="2023-12-31"
				type={EditInputs.date}
			/>
		);
		const input = screen.getByLabelText("Test Date");
		expect(input).toHaveAttribute("min", "2023-01-01");
		expect(input).toHaveAttribute("max", "2023-12-31");
	});

	it("uses defaultValue if provided", () => {
		renderWithForm(
			<DateInput
				{...baseProps}
				// @ts-expect-error - should be date
				defaultValue="2022-05-10"
				type={EditInputs.date}
			/>
		);
		expect(screen.getByLabelText("Test Date")).toHaveValue("2022-05-10");
	});

	it("uses value from form context if present", () => {
		renderWithForm(<DateInput {...baseProps} type={EditInputs.date} />, {
			"test-date": "2021-12-25",
		});
		expect(screen.getByLabelText("Test Date")).toHaveValue("2021-12-25");
	});

	it("renders with empty label if not provided", () => {
		renderWithForm(<DateInput id="no-label" type={EditInputs.date} />);
		expect(screen.getByLabelText("")).toBeInTheDocument();
	});
});
