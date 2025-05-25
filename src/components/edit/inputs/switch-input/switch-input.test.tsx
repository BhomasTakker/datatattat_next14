import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { SwitchInput } from "./switch-input";
import { EditInputs } from "../inputs";

jest.mock("react-icons/fa", () => ({
	FaCheck: () => <span data-testid="fa-check" />,
}));

const renderWithForm = (ui: React.ReactElement) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm();
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(ui, { wrapper: Wrapper });
};

describe("SwitchInput", () => {
	it("renders with label and checkbox", () => {
		renderWithForm(
			<SwitchInput
				id="test-switch"
				label="Test Label"
				type={EditInputs.switch}
			/>
		);
		expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("renders the FaCheck icon", () => {
		renderWithForm(
			<SwitchInput
				id="test-switch"
				label="Test Label"
				type={EditInputs.switch}
			/>
		);
		expect(screen.getByTestId("fa-check")).toBeInTheDocument();
	});

	it("checkbox is checked when defaultChecked is true", () => {
		renderWithForm(
			<SwitchInput
				id="test-switch"
				label="Test Label"
				defaultChecked
				type={EditInputs.switch}
			/>
		);
		expect(screen.getByRole("checkbox")).toBeChecked();
	});

	it("checkbox is not checked when defaultChecked is false", () => {
		renderWithForm(
			<SwitchInput
				id="test-switch"
				label="Test Label"
				type={EditInputs.switch}
			/>
		);
		expect(screen.getByRole("checkbox")).not.toBeChecked();
	});

	it("checkbox is disabled when disabled prop is true", () => {
		renderWithForm(
			<SwitchInput
				id="test-switch"
				label="Test Label"
				disabled
				type={EditInputs.switch}
			/>
		);
		expect(screen.getByRole("checkbox")).toBeDisabled();
	});

	it("checkbox is enabled when disabled prop is false", () => {
		renderWithForm(
			<SwitchInput
				id="test-switch"
				label="Test Label"
				type={EditInputs.switch}
			/>
		);
		expect(screen.getByRole("checkbox")).toBeEnabled();
	});

	it("calls react-hook-form register with correct id", () => {
		const register = jest.fn(() => ({}));
		jest
			.spyOn(require("react-hook-form"), "useFormContext")
			.mockReturnValue({ register });
		render(
			<SwitchInput id="my-switch" label="Label" type={EditInputs.switch} />
		);
		expect(register).toHaveBeenCalledWith("my-switch");
	});

	it("label is associated with input via htmlFor and id", () => {
		renderWithForm(
			<SwitchInput
				id="switch-id"
				label="Switch Label"
				type={EditInputs.switch}
			/>
		);
		const label = screen.getByLabelText("Switch Label");
		expect(label).toBeInTheDocument();
		expect(screen.getByRole("checkbox").id).toBe("switch-id");
	});
});
