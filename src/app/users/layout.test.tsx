import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";
import { PageLayout } from "@/components/ui/layout/page-layout";

jest.mock("../../components/ui/layout/page-layout", () => ({
	PageLayout: jest.fn(({ children }: any) => (
		<div data-testid="page-display">{children}</div>
	)),
}));

describe("RootLayout", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("renders children correctly", async () => {
		// @ts-expect-error - children type JSX or ReactNode
		render(await RootLayout({ children: <span>Test Child</span> }));
		expect(PageLayout).toHaveBeenCalledTimes(1);
		expect(screen.getByText("Test Child")).toBeInTheDocument();
	});

	it("calls PageLayout Once", async () => {
		// @ts-expect-error - children type JSX or ReactNode
		render(await RootLayout({ children: <span>Test Child</span> }));
		expect(PageLayout).toHaveBeenCalledTimes(1);
	});

	describe("Snaps", () => {
		it("renders Layout Unchanged", async () => {
			const { container } = render(
				// @ts-expect-error - children type JSX or ReactNode
				await RootLayout({ children: <span>Test Child</span> })
			);
			expect(container).toMatchSnapshot();
		});
	});
});
