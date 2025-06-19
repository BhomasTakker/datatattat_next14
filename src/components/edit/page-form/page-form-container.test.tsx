import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PageFormContainer } from "./page-form-container";
import { IPage } from "@/types/page";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { savePage } from "@/actions/edit/update-page";

// Mock dependencies
jest.mock("../../../actions/edit/update-page", () => ({
	savePage: jest.fn(),
}));
jest.mock("sonner", () => ({
	toast: {
		promise: jest.fn(),
	},
}));
jest.mock("./page-form", () => ({
	PageForm: ({ submitHandler }: any) => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submitHandler({ title: "New Title" });
			}}
		>
			<button type="submit">Submit</button>
		</form>
	),
}));
jest.mock("../context/edit-context", () => ({
	EditContextProvider: ({ children, value }: any) => <div>{children}</div>,
}));

const mockRefresh = jest.fn();
const mockReset = jest.fn();

const pageData: IPage = {
	id: "1",
	route: "/test",
	title: "Test Page",
	// @ts-expect-error - mock data
	content: "Test Content",
};

describe("PageFormContainer", () => {
	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({ refresh: mockRefresh });
		mockRefresh.mockClear();
		mockReset.mockClear();
		(toast.promise as jest.Mock).mockClear();
		jest.clearAllMocks();
	});

	it("renders the PageForm", () => {
		render(<PageFormContainer pageData={pageData} />);
		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
	});

	it("calls refresh on mount and when route changes", () => {
		render(<PageFormContainer pageData={pageData} />);
		expect(mockRefresh).toHaveBeenCalledTimes(1);
	});

	it("calls savePage", async () => {
		(savePage as jest.Mock).mockResolvedValueOnce({ success: true });

		render(<PageFormContainer pageData={pageData} />);
		fireEvent.click(screen.getByRole("button", { name: /submit/i }));

		await waitFor(() => {
			expect(savePage).toHaveBeenCalledWith(
				"/test",
				expect.objectContaining({ title: "Test Page" })
			);
			expect(toast.promise).toHaveBeenCalled();
		});
	});

	it("handles savePage error", async () => {
		(savePage as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

		render(<PageFormContainer pageData={pageData} />);
		fireEvent.click(screen.getByRole("button", { name: /submit/i }));

		await waitFor(() => {
			expect(savePage).toHaveBeenCalled();
			expect(toast.promise).toHaveBeenCalledWith(
				expect.any(Promise),
				expect.objectContaining({
					loading: expect.any(String),
					success: expect.any(String),
					error: expect.any(String),
				})
			);
		});
	});
});
