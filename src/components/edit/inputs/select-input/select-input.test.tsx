import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { SelectInput } from "./select-input";

const renderWithForm = (ui: React.ReactElement, defaultValues = {}) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm({ defaultValues });
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(ui, { wrapper: Wrapper });
};

describe("SelectInput", () => {
	const baseProps = {
		id: "test-select",
		label: "Test Label",
		options: ["Option1", "Option2", "Option3"],
		required: true,
	};

	it("renders label and select", () => {
		renderWithForm(<SelectInput {...baseProps} />);
		expect(screen.getByTestId("select-input-label")).toBeInTheDocument();
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("renders all options", () => {
		renderWithForm(<SelectInput {...baseProps} />);
		baseProps.options.forEach((opt) => {
			expect(screen.getByRole("option", { name: opt })).toBeInTheDocument();
		});
	});

	it("does not render deselect option when required", () => {
		renderWithForm(<SelectInput {...baseProps} />);
		expect(
			screen.queryByRole("option", { name: "--Deselect--" })
		).not.toBeInTheDocument();
	});

	it("renders deselect option when not required", () => {
		renderWithForm(<SelectInput {...baseProps} required={false} />);
		expect(
			screen.getByRole("option", { name: "--Deselect--" })
		).toBeInTheDocument();
	});

	it("renders custom deselect label", () => {
		renderWithForm(
			<SelectInput {...baseProps} required={false} deselectLabel="None" />
		);
		expect(screen.getByRole("option", { name: "None" })).toBeInTheDocument();
	});

	it("sets defaultValue from getValues if present", () => {
		const defaultValues = { "test-select": "Option2" };
		renderWithForm(<SelectInput {...baseProps} />, defaultValues);
		const select = screen.getByRole("combobox") as HTMLSelectElement;
		expect(select.value).toBe("Option2");
	});

	it("sets defaultValue from prop if getValues is empty", () => {
		renderWithForm(
			<SelectInput {...baseProps} required={false} defaultValue="Option3" />
		);
		const select = screen.getByRole("combobox") as HTMLSelectElement;
		expect(select.value).toBe("Option3");
	});
});
