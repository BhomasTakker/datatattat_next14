import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { URLInput } from "./url-input";

const renderWithForm = (props: any) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm();
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(<URLInput {...props} />, { wrapper: Wrapper });
};

describe("URLInput", () => {
	const baseProps = {
		id: "test-url",
		label: "Website",
		defaultValue: "",
		validation: {},
		required: true,
		disabled: false,
	};

	it("renders label and input", () => {
		renderWithForm(baseProps);
		expect(screen.getByLabelText("Website")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("applies the default value", () => {
		renderWithForm({ ...baseProps, defaultValue: "https://example.com" });
		expect(screen.getByRole("textbox")).toHaveValue("https://example.com");
	});

	it("sets input as required", () => {
		renderWithForm({ ...baseProps, required: true });
		expect(screen.getByRole("textbox")).toBeRequired();
	});

	it("disables the input when disabled is true", () => {
		renderWithForm({ ...baseProps, disabled: true });
		expect(screen.getByRole("textbox")).toBeDisabled();
	});

	it("renders with custom label", () => {
		renderWithForm({ ...baseProps, label: "Custom Label" });
		expect(screen.getByLabelText("Custom Label")).toBeInTheDocument();
	});

	it("input type is url", () => {
		renderWithForm(baseProps);
		expect(screen.getByRole("textbox")).toHaveAttribute("type", "url");
	});
});
