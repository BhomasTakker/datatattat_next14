import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

const TestChild = () => <div data-testid="test-child">Child Content</div>;
const params = Promise.resolve({ route: [] });

// Mock the imported components
jest.mock("../../components/header/main-header", () => ({
	MainHeader: () => <div data-testid="main-header" />,
}));
jest.mock("../../components/ui/layout/page-layout", () => ({
	PageLayout: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="page-layout">{children}</div>
	),
}));
jest.mock("../../lib/sonner/toast-container", () => ({
	ToastContainer: () => <div data-testid="toast-container" />,
}));

describe("RootLayout", () => {
	it("renders PageLayout, MainHeader, children, and ToastContainer", async () => {
		render(await RootLayout({ children: <TestChild />, params }));

		expect(screen.getByTestId("page-layout")).toBeInTheDocument();
		expect(screen.getByTestId("main-header")).toBeInTheDocument();
		expect(screen.getByTestId("test-child")).toBeInTheDocument();
		expect(screen.getByTestId("toast-container")).toBeInTheDocument();
	});

	describe("Snaps", () => {
		it("renders Layout Unchanged", async () => {
			const { container } = render(
				await RootLayout({ children: <TestChild />, params })
			);
			expect(container).toMatchSnapshot();
		});
	});
});
