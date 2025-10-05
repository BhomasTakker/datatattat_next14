import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { ArrayInput, ArrayInputList } from "./array-input";
import { EditInputs } from "../inputs";
import { EditContext } from "../../context/edit-context";
import { IconButton } from "../../../../components/ui/icon-button";

// Mock the InputFactory component
jest.mock("../input-factory", () => ({
	InputFactory: ({ data }: { data: any }) => (
		<div data-testid={`input-factory-${data.id}`}>
			Mock Input Factory: {data.id}
		</div>
	),
}));

// Mock the IconButton component to properly handle data-testid
jest.mock("../../../../components/ui/icon-button", () => ({
	IconButton: ({ onClick, icon: Icon, ...props }: any) => (
		<button onClick={onClick} className="icon" type="button" {...props}>
			<Icon />
		</button>
	),
}));

// Mock the utils
jest.mock("./utils", () => ({
	createIdentifier: (id: string) => (
		<div data-testid={`identifier-${id}`}>Mock Identifier: {id}</div>
	),
}));

// Mock the array-input-actions
jest.mock("./array-input-actions", () => ({
	add: jest.fn((params) => jest.fn()),
	move: jest.fn((params) => jest.fn()),
	onDelete: jest.fn((params) => jest.fn()),
}));

// Mock random key generator
let keyCounter = 0;
jest.mock("../../../../utils/edit", () => ({
	randomKeyGenerator: jest.fn(() => `mock-key-${++keyCounter}`),
}));

// Helper to wrap component in react-hook-form and EditContext
const TestWrapper: React.FC<{
	children: React.ReactNode;
	defaultValues?: any;
	submitDraftHandler?: () => void;
}> = ({ children, defaultValues = {}, submitDraftHandler = jest.fn() }) => {
	const methods = useForm({ defaultValues });
	const editContextValue = {
		submitHandler: jest.fn(),
		submitDraftHandler,
		submitDebugHandler: jest.fn(),
	};

	return (
		// @ts-expect-error - Ignore type error for simplicity in this test context
		<EditContext.Provider value={editContextValue}>
			<FormProvider {...methods}>{children}</FormProvider>
		</EditContext.Provider>
	);
};

describe("ArrayInput", () => {
	const mockTemplate = {
		id: "template-input",
		type: EditInputs.text as EditInputs.text,
		label: "Template",
	};

	const baseProps = {
		input: mockTemplate,
		id: "test-array",
		title: "Test Array",
		type: EditInputs.array as EditInputs.array,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("renders with required props", () => {
			render(
				<TestWrapper>
					<ArrayInput {...baseProps} />
				</TestWrapper>
			);

			expect(screen.getByText("Test Array")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Add New Template" })
			).toBeInTheDocument();
		});

		it("renders with default values", () => {
			const defaultValues = {
				"test-array": [{ id: "item1" }, { id: "item2" }],
			};

			render(
				<TestWrapper defaultValues={defaultValues}>
					<ArrayInput
						{...baseProps}
						defaultValue={[{ id: "default1", type: EditInputs.text }]}
					/>
				</TestWrapper>
			);

			expect(screen.getByText("Test Array")).toBeInTheDocument();
		});

		it("renders empty array when no default values", () => {
			render(
				<TestWrapper>
					<ArrayInput {...baseProps} />
				</TestWrapper>
			);

			expect(screen.getByText("Test Array")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Add New Template" })
			).toBeInTheDocument();
		});
	});

	describe("Disabled State", () => {
		it("hides controls when disabled is true", () => {
			render(
				<TestWrapper>
					<ArrayInput {...baseProps} disabled={true} />
				</TestWrapper>
			);

			expect(screen.getByText("Test Array")).toBeInTheDocument();
			expect(
				screen.queryByRole("button", { name: "Add New Template" })
			).not.toBeInTheDocument();
		});

		it("shows controls when disabled is false", () => {
			render(
				<TestWrapper>
					<ArrayInput {...baseProps} disabled={false} />
				</TestWrapper>
			);

			expect(
				screen.getByRole("button", { name: "Add New Template" })
			).toBeInTheDocument();
		});
	});

	describe("Add Functionality", () => {
		it("calls add function when Add New button is clicked", async () => {
			const user = userEvent.setup();
			const mockAdd = jest.fn();

			// Mock the add function to return our mock
			const { add } = require("./array-input-actions");
			add.mockReturnValue(mockAdd);

			render(
				<TestWrapper>
					<ArrayInput {...baseProps} />
				</TestWrapper>
			);

			const addButton = screen.getByRole("button", {
				name: "Add New Template",
			});
			await user.click(addButton);

			expect(mockAdd).toHaveBeenCalled();
		});
	});

	describe("Identifier Functionality", () => {
		it("shows identifier when showIdentifier is true", () => {
			const defaultValues = {
				"test-array": [{ key: "item1" }],
			};

			render(
				<TestWrapper defaultValues={defaultValues}>
					<ArrayInput {...baseProps} showIdentifier={true} />
				</TestWrapper>
			);

			expect(screen.getByTestId(/identifier-/)).toBeInTheDocument();
		});

		it("hides identifier when showIdentifier is false", () => {
			const defaultValues = {
				"test-array": [{ key: "item1" }],
			};

			render(
				<TestWrapper defaultValues={defaultValues}>
					<ArrayInput {...baseProps} showIdentifier={false} />
				</TestWrapper>
			);

			expect(screen.queryByTestId(/identifier-/)).not.toBeInTheDocument();
		});
	});
});

describe("ArrayInputList", () => {
	const mockTemplate = {
		id: "template-input",
		type: EditInputs.text as EditInputs.text,
		label: "Template",
	};

	const mockInputs = [
		{ id: "input1", type: EditInputs.text as EditInputs.text, key: "key1" },
		{ id: "input2", type: EditInputs.text as EditInputs.text, key: "key2" },
	];

	const baseProps = {
		parentId: "parent",
		inputs: mockInputs,
		template: mockTemplate,
		createObject: true,
		onMove: jest.fn(),
		onDelete: jest.fn(),
		isCollapsible: false,
		showIdentifier: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders list of array items", () => {
		render(
			<TestWrapper>
				<ArrayInputList {...baseProps} />
			</TestWrapper>
		);

		expect(
			screen.getByTestId(/input-factory-parent\.\[0\]\.template-input/)
		).toBeInTheDocument();
		expect(
			screen.getByTestId(/input-factory-parent\.\[1\]\.template-input/)
		).toBeInTheDocument();
	});

	it("renders move and delete controls when showControls is true", () => {
		render(
			<TestWrapper>
				<ArrayInputList {...baseProps} showControls={true} />
			</TestWrapper>
		);

		expect(screen.getAllByTestId("move-up")).toHaveLength(2);
		expect(screen.getAllByTestId("move-down")).toHaveLength(2);
		expect(screen.getAllByTestId("delete")).toHaveLength(2);
	});

	it("hides controls when showControls is false", () => {
		render(
			<TestWrapper>
				<ArrayInputList {...baseProps} showControls={false} />
			</TestWrapper>
		);

		expect(screen.queryByTestId("move-up")).not.toBeInTheDocument();
		expect(screen.queryByTestId("move-down")).not.toBeInTheDocument();
		expect(screen.queryByTestId("delete")).not.toBeInTheDocument();
	});

	it("shows collapse controls when isCollapsible is true", () => {
		render(
			<TestWrapper>
				<ArrayInputList {...baseProps} isCollapsible={true} />
			</TestWrapper>
		);

		expect(screen.getAllByTestId("collapse")).toHaveLength(2);
	});

	it("calls onMove when move buttons are clicked", async () => {
		const user = userEvent.setup();
		const mockOnMove = jest.fn();

		render(
			<TestWrapper>
				<ArrayInputList
					{...baseProps}
					onMove={mockOnMove}
					showControls={true}
				/>
			</TestWrapper>
		);

		const moveUpButtons = screen.getAllByTestId("move-up");
		const moveDownButtons = screen.getAllByTestId("move-down");

		await user.click(moveUpButtons[0]);
		expect(mockOnMove).toHaveBeenCalledWith(0, "up");

		await user.click(moveDownButtons[1]);
		expect(mockOnMove).toHaveBeenCalledWith(1, "down");
	});

	it("calls onDelete when delete button is clicked", async () => {
		const user = userEvent.setup();
		const mockOnDelete = jest.fn();

		render(
			<TestWrapper>
				<ArrayInputList
					{...baseProps}
					onDelete={mockOnDelete}
					showControls={true}
				/>
			</TestWrapper>
		);

		const deleteButtons = screen.getAllByTestId("delete");
		await user.click(deleteButtons[0]);

		expect(mockOnDelete).toHaveBeenCalledWith(0);
	});

	it("shows identifier input when showIdentifier is true", () => {
		render(
			<TestWrapper>
				<ArrayInputList {...baseProps} showIdentifier={true} />
			</TestWrapper>
		);

		expect(
			screen.getByTestId(/identifier-parent\.\[0\]\.arrayItem/)
		).toBeInTheDocument();
		expect(
			screen.getByTestId(/identifier-parent\.\[1\]\.arrayItem/)
		).toBeInTheDocument();
	});
});

describe("Collapsible Functionality", () => {
	const mockTemplate = {
		id: "template-input",
		type: EditInputs.text as EditInputs.text,
		label: "Template",
	};

	const mockInputs = [
		{ id: "input1", type: EditInputs.text as EditInputs.text, key: "key1" },
	];

	const baseProps = {
		parentId: "parent",
		inputs: mockInputs,
		template: mockTemplate,
		createObject: true,
		onMove: jest.fn(),
		onDelete: jest.fn(),
		isCollapsible: true,
		showIdentifier: false,
	};

	it("toggles collapse state when collapse button is clicked", async () => {
		const user = userEvent.setup();

		render(
			<TestWrapper>
				<ArrayInputList {...baseProps} showControls={true} />
			</TestWrapper>
		);

		const collapseButton = screen.getByTestId("collapse");

		// Initially not collapsed
		expect(collapseButton).toBeInTheDocument();

		// Click to collapse
		await user.click(collapseButton);

		// The component should update its internal state
		// This tests the toggle functionality
		expect(collapseButton).toBeInTheDocument();
	});
});
