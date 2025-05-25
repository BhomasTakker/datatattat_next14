import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HeaderForm } from "./header-form";
import { saveHeader as mockSaveHeader } from "@/actions/edit/update-header";
import { getPagesForUser as mockGetPagesForUser } from "@/actions/page/page-actions";
import { toast } from "sonner";

// Mock dependencies
jest.mock("../../../actions/edit/update-header", () => ({
	saveHeader: jest.fn(),
}));
jest.mock("../../../actions/page/page-actions", () => ({
	getPagesForUser: jest.fn(),
}));
jest.mock("sonner", () => ({
	toast: {
		promise: jest.fn(),
	},
}));

jest.mock("./nav/nav-list", () => ({
	NavList: ({ links, pages }: any) => (
		<div data-testid="nav-list">
			{links && <span>Links: {links.length}</span>}
			{pages && <span>Pages: {pages.length}</span>}
		</div>
	),
}));

const headerData = {
	route: "/test",
	nav: [{ label: "Home", href: "/" }],
};

const user = {
	user_id: "user-123",
};

const pagesMock = [
	{ id: "1", title: "Page 1" },
	{ id: "2", title: "Page 2" },
];

describe("HeaderForm", () => {
	beforeEach(() => {
		(mockGetPagesForUser as jest.Mock).mockResolvedValue(pagesMock);
		(mockSaveHeader as jest.Mock).mockResolvedValue({});
		(toast.promise as jest.Mock).mockClear();
	});

	it("renders form with NavList and submit button", async () => {
		// @ts-expect-error - mock header data
		render(<HeaderForm headerData={headerData} user={user as any} />);
		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getByTestId("nav-list")).toBeInTheDocument();
			expect(screen.getByText(/Links: 1/)).toBeInTheDocument();
			expect(screen.getByText(/Pages: 2/)).toBeInTheDocument();
		});
	});

	it("fetches pages for user on mount", async () => {
		// @ts-expect-error - mock header data
		render(<HeaderForm headerData={headerData} user={user as any} />);
		await waitFor(() => {
			expect(mockGetPagesForUser).toHaveBeenCalledWith(user.user_id);
		});
	});

	it("calls saveHeader and shows toast on submit", async () => {
		// @ts-expect-error - mock header data
		render(<HeaderForm headerData={headerData} user={user as any} />);
		const submitButton = screen.getByRole("button", { name: /submit/i });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockSaveHeader).toHaveBeenCalled();
			expect(toast.promise).toHaveBeenCalled();
		});
	});
});
