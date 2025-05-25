import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { ArrayInput } from "./array-input";
import { EditContext } from "../../context/edit-context";
import { EditInputs } from "../inputs";

const addMock = require("./array-input-actions").add;
const moveMock = require("./array-input-actions").move;
const onDeleteMock = require("./array-input-actions").onDelete;

// This isn't correct
// We aren't rendering actual array items because we get that from form state

// Mock dependencies
jest.mock("sonner", () => ({
	toast: jest.fn(),
}));
jest.mock("./array-input-actions", () => ({
	add: jest.fn(() => jest.fn()),
	move: jest.fn(() => jest.fn()),
	onDelete: jest.fn(() => jest.fn()),
}));
jest.mock("../../../../utils/edit", () => ({
	randomKeyGenerator: jest.fn(() => Math.random().toString()),
}));
jest.mock("../input-factory", () => ({
	InputFactory: ({ data }: any) => (
		<input data-testid="input-factory" value={data.id} readOnly />
	),
}));

const defaultInput = {
	id: "test",
	label: "Test",
	type: "text",
};

const renderWithProviders = (ui: React.ReactElement, formProps: any = {}) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm(formProps);
		return (
			<EditContext.Provider value={{ submitHandler: jest.fn() } as any}>
				<FormProvider {...methods}>{children}</FormProvider>
			</EditContext.Provider>
		);
	};
	return render(ui, { wrapper: Wrapper });
};

describe("ArrayInput", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders title and add button", () => {
		renderWithProviders(
			<ArrayInput
				input={defaultInput as any}
				id="arr"
				title="My Array"
				type={EditInputs.array}
			/>
		);
		expect(screen.getByText("My Array")).toBeInTheDocument();
		expect(screen.getByText("Add New Test")).toBeInTheDocument();
	});

	it("renders inputs from defaultValue", () => {
		renderWithProviders(
			<ArrayInput
				input={defaultInput as any}
				id="arr"
				title="My Array"
				// @ts-expect-error
				defaultValue={[{ foo: "bar" }, { foo: "baz" }]}
			/>
		);
		expect(screen.getAllByTestId("input-factory")).toHaveLength(2);
	});

	it("does not show controls when disabled", () => {
		renderWithProviders(
			<ArrayInput
				input={defaultInput as any}
				id="arr"
				title="My Array"
				disabled
				// @ts-expect-error
				defaultValue={[{ foo: "bar" }]}
			/>
		);
		expect(screen.queryByText("Add New Test")).not.toBeInTheDocument();
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("calls addInput when add button is clicked", () => {
		const addHandler = jest.fn();
		addMock.mockReturnValue(addHandler);

		renderWithProviders(
			<ArrayInput
				input={defaultInput as any}
				id="arr"
				title="My Array"
				type={EditInputs.array}
			/>
		);
		fireEvent.click(screen.getByText("Add New Test"));
		expect(addHandler).toHaveBeenCalled();
	});

	it.skip("calls onMove when move up/down buttons are clicked", () => {
		const moveHandler = jest.fn();
		moveMock.mockReturnValue(moveHandler);

		renderWithProviders(
			<ArrayInput
				input={defaultInput as any}
				id="arr"
				title="My Array"
				// @ts-expect-error
				defaultValue={[{ foo: "bar" }]}
			/>
		);
		const upBtn = screen.getByTestId("move-up");
		fireEvent.click(upBtn);
		expect(moveHandler).toHaveBeenCalled();
	});

	it("calls onDelete when delete button is clicked", () => {
		const onDeleteHandler = jest.fn();
		onDeleteMock.mockReturnValue(onDeleteHandler);

		renderWithProviders(
			<ArrayInput
				input={defaultInput as any}
				id="arr"
				title="My Array"
				// @ts-expect-error
				defaultValue={[{ foo: "bar" }]}
			/>
		);
		const buttons = screen.getAllByRole("button");
		// The third button is delete (up, down, delete)
		fireEvent.click(buttons[2]);
		expect(onDeleteHandler).toHaveBeenCalled();
	});

	it("renders no inputs if defaultValue is empty", () => {
		renderWithProviders(
			<ArrayInput
				input={defaultInput as any}
				id="arr"
				title="My Array"
				defaultValue={[]}
				type={EditInputs.array}
			/>
		);
		expect(screen.queryByTestId("input-factory")).not.toBeInTheDocument();
	});

	describe("Snaps", () => {
		it("renders ArrayInput Unchanged", async () => {
			const { container } = renderWithProviders(
				<ArrayInput
					input={defaultInput as any}
					id="arr"
					title="My Array"
					defaultValue={[]}
					type={EditInputs.array}
				/>
			);
			expect(container).toMatchSnapshot();
		});
	});
});
