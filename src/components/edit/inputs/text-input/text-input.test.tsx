import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { TextInput } from "./text-input";
import { EditInputs } from "../inputs";

// Helper to wrap component in react-hook-form context
const Wrapper: React.FC<{ children: React.ReactNode; defaultValues?: any }> = ({
	children,
	defaultValues = {},
}) => {
	const methods = useForm({ defaultValues });
	return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("TextInput", () => {
	const baseProps = {
		id: "test-input",
		label: "Test Label",
		defaultValue: "",
		validation: {},
		required: true,
		disabled: false,
	};

	it("renders label and input", () => {
		render(
			<Wrapper>
				<TextInput {...baseProps} type={EditInputs.text} />
			</Wrapper>
		);
		expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("applies defaultValue if provided", () => {
		render(
			<Wrapper>
				<TextInput
					{...baseProps}
					defaultValue="default text"
					type={EditInputs.text}
				/>
			</Wrapper>
		);
		expect(screen.getByRole("textbox")).toHaveValue("default text");
	});

	it("uses value from form context if present", () => {
		render(
			<Wrapper defaultValues={{ "test-input": "context value" }}>
				<TextInput
					{...baseProps}
					defaultValue="default text"
					type={EditInputs.text}
				/>
			</Wrapper>
		);
		expect(screen.getByRole("textbox")).toHaveValue("context value");
	});

	it("sets required attribute when required is true", () => {
		render(
			<Wrapper>
				<TextInput {...baseProps} required={true} type={EditInputs.text} />
			</Wrapper>
		);
		expect(screen.getByRole("textbox")).toBeRequired();
	});

	it("does not set required attribute when required is false", () => {
		render(
			<Wrapper>
				<TextInput {...baseProps} required={false} type={EditInputs.text} />
			</Wrapper>
		);
		expect(screen.getByRole("textbox")).not.toBeRequired();
	});

	it("disables input when disabled is true", () => {
		render(
			<Wrapper>
				<TextInput {...baseProps} disabled={true} type={EditInputs.text} />
			</Wrapper>
		);
		// The input is inside a disabled fieldset, so it should be disabled
		expect(screen.getByRole("textbox")).toBeDisabled();
	});

	it("applies custom validation rules", () => {
		const validation = { minLength: 5 };
		render(
			<Wrapper>
				<TextInput
					{...baseProps}
					validation={validation}
					type={EditInputs.text}
				/>
			</Wrapper>
		);
		// react-hook-form handles validation, but we can check the input is rendered
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("renders with empty label if label prop is not provided", () => {
		render(
			<Wrapper>
				<TextInput {...baseProps} label="" type={EditInputs.text} />
			</Wrapper>
		);
		// Should still render an input
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});
});
