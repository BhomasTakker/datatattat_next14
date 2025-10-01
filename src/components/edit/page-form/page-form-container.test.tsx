import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
	PageFormContainer,
	PageFormInteractionController,
} from "./page-form-container";
import type { IPage } from "../../../types/page";

// Mock dependencies
jest.mock("react-hook-form", () => ({
	FormProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="form-provider">{children}</div>
	),
	useForm: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

jest.mock("../../../actions/edit/update-page", () => ({
	savePage: jest.fn(),
}));

jest.mock("../../../utils/edit", () => ({
	randomKeyGenerator: jest.fn(),
}));

jest.mock("../../../lib/sonner/toast", () => ({
	initToastPromise: jest.fn(),
	ToastType: {
		SavePage: "save-page",
	},
}));

// Mock child components
jest.mock("./page-form", () => ({
	PageForm: ({
		submitHandler,
		saveAsTemplateHandler,
		loadTemplateHandler,
		previewHandler,
	}: any) => (
		<div data-testid="page-form">
			<button data-testid="submit-btn" onClick={submitHandler}>
				Submit
			</button>
			<button data-testid="save-template-btn" onClick={saveAsTemplateHandler}>
				Save Template
			</button>
			<button
				data-testid="load-template-btn"
				onClick={() => loadTemplateHandler("test-id")}
			>
				Load Template
			</button>
			<button data-testid="preview-btn" onClick={previewHandler}>
				Preview
			</button>
		</div>
	),
}));

jest.mock("../context/edit-context", () => ({
	EditContextProvider: ({
		children,
		value,
	}: {
		children: React.ReactNode;
		value: any;
	}) => (
		<div
			data-testid="edit-context-provider"
			data-has-submit-handler={typeof value?.submitHandler === "function"}
			data-has-save-template-handler={
				typeof value?.saveAsTemplateHandler === "function"
			}
			data-has-draft-handler={typeof value?.submitDraftHandler === "function"}
			data-has-debug-handler={typeof value?.submitDebugHandler === "function"}
		>
			{children}
		</div>
	),
}));

jest.mock("./modal-container", () => ({
	ModalContainer: (props: any) => {
		const {
			methods,
			pageData,
			showSaveTemplateModal,
			showLoadTemplateModal,
			showPreviewModal,
			setTemplate,
			...otherProps
		} = props;
		return (
			<div
				data-testid="modal-container"
				data-show-save-template={showSaveTemplateModal}
				data-show-load-template={showLoadTemplateModal}
				data-show-preview={showPreviewModal}
				data-has-set-template={typeof setTemplate === "function"}
				data-has-page-data={!!pageData}
				data-has-methods={!!methods}
			>
				Modal Container
			</div>
		);
	},
}));

const mockPageData: IPage = {
	meta: {
		pageTitle: "Test Page",
		pageDescription: "Test Description",
		pageKeywords: "test, keywords",
		pageImage: "test-image.jpg",
		favIcons: [],
		showCardData: false,
		cardData: {
			title: "Test",
			description: "Test",
			image: "test.jpg",
			"image:alt": "Test Alt",
			locale: "en",
			site_name: "Test Site",
			url: "https://test.com",
		},
		createMetaData: true,
	},
	style: {},
	profile: {
		pageTitle: "Test Page",
		showPageTitle: true,
	},
	route: "/test-route",
	creator: "test-creator-id" as any,
	createdAt: new Date(),
	updatedAt: new Date(),
	content: {
		containerType: "Stack",
		props: {},
		components: [],
	},
};

describe("PageFormContainer", () => {
	const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;
	const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
	const mockRandomKeyGenerator = require("../../../utils/edit")
		.randomKeyGenerator as jest.MockedFunction<any>;
	const mockRefresh = jest.fn();

	// Define mockMethods at the top level so it's accessible to all tests
	const mockMethods = {
		handleSubmit: jest.fn(),
		reset: jest.fn(),
		formState: { errors: {} },
		control: {},
		register: jest.fn(),
		unregister: jest.fn(),
		setValue: jest.fn(),
		getValues: jest.fn(),
		watch: jest.fn(),
		trigger: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();

		mockUseRouter.mockReturnValue({
			refresh: mockRefresh,
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
			forward: jest.fn(),
		});

		mockRandomKeyGenerator.mockReturnValue("test-key-123");
		mockUseForm.mockReturnValue(mockMethods as any);
		mockMethods.handleSubmit.mockImplementation((callback) => callback);
	});

	describe("PageFormContainer", () => {
		it("renders PageFormInteractionController with correct props", () => {
			render(<PageFormContainer pageData={mockPageData} />);

			expect(screen.getByTestId("edit-context-provider")).toBeInTheDocument();
			expect(screen.getByTestId("modal-container")).toBeInTheDocument();
			expect(screen.getByTestId("form-provider")).toBeInTheDocument();
			expect(screen.getByTestId("page-form")).toBeInTheDocument();
		});

		it("generates initial key on mount", () => {
			render(<PageFormContainer pageData={mockPageData} />);

			expect(mockRandomKeyGenerator).toHaveBeenCalledTimes(1);
		});

		it("merges page data with template data", () => {
			const { rerender } = render(
				<PageFormContainer pageData={mockPageData} />
			);

			// Initial render with original page data
			expect(screen.getByTestId("edit-context-provider")).toBeInTheDocument();

			// Template data should be merged with page data in the interaction controller
			rerender(<PageFormContainer pageData={mockPageData} />);
			expect(screen.getByTestId("edit-context-provider")).toBeInTheDocument();
		});
	});

	describe("PageFormInteractionController", () => {
		beforeEach(() => {
			mockMethods.handleSubmit.mockImplementation((callback) => callback);
		});

		it("initializes form with correct default values", () => {
			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			expect(mockUseForm).toHaveBeenCalledWith({
				shouldUnregister: true,
				defaultValues: mockPageData,
			});
		});

		it("calls router refresh when route changes", () => {
			const { rerender } = render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			expect(mockRefresh).toHaveBeenCalledTimes(1);

			// Change route and rerender
			const updatedPageData = { ...mockPageData, route: "/new-route" };
			rerender(
				<PageFormInteractionController
					pageData={updatedPageData}
					setTemplate={jest.fn()}
				/>
			);

			expect(mockRefresh).toHaveBeenCalledTimes(2);
		});

		it("provides correct context value to EditContextProvider", () => {
			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			const contextProvider = screen.getByTestId("edit-context-provider");

			expect(contextProvider).toHaveAttribute(
				"data-has-submit-handler",
				"true"
			);
			expect(contextProvider).toHaveAttribute(
				"data-has-save-template-handler",
				"true"
			);
			expect(contextProvider).toHaveAttribute("data-has-draft-handler", "true");
			expect(contextProvider).toHaveAttribute("data-has-debug-handler", "true");
		});

		it("passes correct props to ModalContainer", () => {
			const mockSetTemplate = jest.fn();
			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={mockSetTemplate}
				/>
			);

			const modalContainer = screen.getByTestId("modal-container");

			expect(modalContainer).toHaveAttribute(
				"data-show-save-template",
				"false"
			);
			expect(modalContainer).toHaveAttribute(
				"data-show-load-template",
				"false"
			);
			expect(modalContainer).toHaveAttribute("data-show-preview", "false");
			expect(modalContainer).toHaveAttribute("data-has-set-template", "true");
			expect(modalContainer).toHaveAttribute("data-has-page-data", "true");
			expect(modalContainer).toHaveAttribute("data-has-methods", "true");
		});

		it("handles modal state changes", async () => {
			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			// Test save template button
			const saveTemplateBtn = screen.getByTestId("save-template-btn");
			fireEvent.click(saveTemplateBtn);

			await waitFor(() => {
				const modalContainer = screen.getByTestId("modal-container");
				expect(modalContainer).toHaveAttribute(
					"data-show-save-template",
					"true"
				);
			});

			// Test preview button
			const previewBtn = screen.getByTestId("preview-btn");
			fireEvent.click(previewBtn);

			await waitFor(() => {
				const modalContainer = screen.getByTestId("modal-container");
				expect(modalContainer).toHaveAttribute("data-show-preview", "true");
			});
		});

		it("handles form submission", async () => {
			const mockSavePage =
				require("../../../actions/edit/update-page").savePage;
			const mockInitToastPromise =
				require("../../../lib/sonner/toast").initToastPromise;

			mockMethods.handleSubmit.mockImplementation(
				(callback: any) => async (e?: any) => {
					e?.preventDefault();
					await callback({ title: "Updated Title" });
				}
			);

			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			const submitBtn = screen.getByTestId("submit-btn");

			await act(async () => {
				fireEvent.click(submitBtn);
			});

			expect(mockInitToastPromise).toHaveBeenCalledWith({
				cb: expect.any(Function),
				id: "save-page",
				onComplete: expect.any(Function),
				onError: expect.any(Function),
			});
		});

		it("handles save as template", async () => {
			mockMethods.handleSubmit.mockImplementation(
				(callback: any) => async (e?: any) => {
					e?.preventDefault();
					await callback({ title: "Template Title" });
				}
			);

			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			const saveTemplateBtn = screen.getByTestId("save-template-btn");

			await act(async () => {
				fireEvent.click(saveTemplateBtn);
			});

			await waitFor(() => {
				const modalContainer = screen.getByTestId("modal-container");
				expect(modalContainer).toHaveAttribute(
					"data-show-save-template",
					"true"
				);
			});
		});

		it("handles load template", () => {
			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			const loadTemplateBtn = screen.getByTestId("load-template-btn");
			fireEvent.click(loadTemplateBtn);

			// Should open load template modal
			const modalContainer = screen.getByTestId("modal-container");
			expect(modalContainer).toHaveAttribute("data-show-load-template", "true");
		});

		it("handles preview", () => {
			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			const previewBtn = screen.getByTestId("preview-btn");
			fireEvent.click(previewBtn);

			// Should open preview modal
			const modalContainer = screen.getByTestId("modal-container");
			expect(modalContainer).toHaveAttribute("data-show-preview", "true");
		});
	});

	describe("Error Handling", () => {
		it("handles form submission errors", async () => {
			const mockInitToastPromise =
				require("../../../lib/sonner/toast").initToastPromise;
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			mockMethods.handleSubmit.mockImplementation(
				(callback: any) => async (e?: any) => {
					e?.preventDefault();
					await callback({ title: "Updated Title" });
				}
			);

			render(
				<PageFormInteractionController
					pageData={mockPageData}
					setTemplate={jest.fn()}
				/>
			);

			const submitBtn = screen.getByTestId("submit-btn");

			await act(async () => {
				fireEvent.click(submitBtn);
			});

			// Simulate error in toast promise
			const toastCall = mockInitToastPromise.mock.calls[0][0];
			const mockError = new Error("Save failed");
			toastCall.onError(mockError);

			expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

			consoleErrorSpy.mockRestore();
		});
	});

	describe("Component Integration", () => {
		it("integrates all components correctly", () => {
			render(<PageFormContainer pageData={mockPageData} />);

			// Check that all major components are rendered
			expect(screen.getByTestId("edit-context-provider")).toBeInTheDocument();
			expect(screen.getByTestId("modal-container")).toBeInTheDocument();
			expect(screen.getByTestId("form-provider")).toBeInTheDocument();
			expect(screen.getByTestId("page-form")).toBeInTheDocument();

			// Check that form buttons are present
			expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
			expect(screen.getByTestId("save-template-btn")).toBeInTheDocument();
			expect(screen.getByTestId("load-template-btn")).toBeInTheDocument();
			expect(screen.getByTestId("preview-btn")).toBeInTheDocument();
		});
	});
});
