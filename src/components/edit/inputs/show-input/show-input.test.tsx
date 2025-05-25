import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";

import { EditInputs } from "../inputs";
import { ShowInput } from "./show-input";

// Mock styles
jest.mock("./show-input.module.scss", () => ({
	root: "root",
	input: "input",
	container: "container",
	checkmark: "checkmark",
	icon: "icon",
}));

// Mock react-icons
jest.mock("react-icons/fa", () => ({
	FaCheck: () => <span data-testid="fa-check" />,
}));

// Mock getParentId
jest.mock("../../../../utils/edit", () => ({
	getParentId: (id: string) => `parent-${id}`,
}));

// Mock InputList
jest.mock("../input-list/input-list", () => ({
	InputList: ({ id, inputs, type }: any) => (
		<div data-testid="input-list" data-id={id} data-type={type}>
			{inputs && inputs.length > 0 ? "InputList" : "NoInputs"}
		</div>
	),
}));

const renderWithForm = (ui: React.ReactElement, defaultValues = {}) => {
	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const methods = useForm({ defaultValues });
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(ui, { wrapper: Wrapper });
};

describe("ShowInput", () => {
	const defaultProps = {
		id: "test-checkbox",
		label: "Test Label",
		defaultChecked: false,
		type: EditInputs.show,
		inputs: [{ id: "child1" }, { id: "child2" }],
	};

	it("renders label and checkbox", () => {
		// @ts-expect-error - mock inputs
		renderWithForm(<ShowInput {...defaultProps} />);
		expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
		expect(screen.getByTestId("fa-check")).toBeInTheDocument();
	});

	it("checkbox is unchecked by default", () => {
		// @ts-expect-error - mock inputs
		renderWithForm(<ShowInput {...defaultProps} />);
		expect(screen.getByRole("checkbox")).not.toBeChecked();
	});

	it("checkbox is checked if defaultChecked is true", () => {
		// @ts-expect-error - mock inputs
		renderWithForm(<ShowInput {...defaultProps} defaultChecked={true} />);
		expect(screen.getByRole("checkbox")).toBeChecked();
	});

	it("does not render children when checkbox is unchecked", () => {
		// @ts-expect-error - mock inputs
		renderWithForm(<ShowInput {...defaultProps} />);
		expect(screen.queryByTestId("input-list")).not.toBeInTheDocument();
	});

	it("renders children when checkbox is checked", () => {
		// @ts-expect-error - mock inputs
		renderWithForm(<ShowInput {...defaultProps} />);
		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);
		expect(screen.getByTestId("input-list")).toBeInTheDocument();
		expect(screen.getByTestId("input-list")).toHaveAttribute(
			"data-id",
			"parent-test-checkbox"
		);
		expect(screen.getByTestId("input-list")).toHaveAttribute(
			"data-type",
			EditInputs.inputList
		);
	});

	it("renders nothing for children if inputs is empty", () => {
		// @ts-expect-error - mock inputs
		renderWithForm(<ShowInput {...defaultProps} inputs={[]} />);
		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);
		expect(screen.getByTestId("input-list")).toHaveTextContent("NoInputs");
	});

	it("calls register with correct id", () => {
		const registerMock = jest.fn();
		jest.spyOn(require("react-hook-form"), "useFormContext").mockReturnValue({
			register: registerMock,
			watch: () => false,
		});
		// @ts-expect-error - mock inputs
		render(<ShowInput {...defaultProps} />);
		expect(registerMock).toHaveBeenCalledWith("test-checkbox");
	});
});
