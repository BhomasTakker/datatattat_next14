import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

// Mock the MainHeader and PageLayout components
jest.mock("../../../components/header/main-header", () => ({
	MainHeader: ({ route }: { route: string[] }) => (
		<div data-testid="main-header">{route.join("/")}</div>
	),
}));
jest.mock("../../../components/ui/layout/page-layout", () => ({
	PageLayout: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="page-layout">{children}</div>
	),
}));

describe("RootLayout", () => {
	it("renders children inside PageLayout", async () => {
		const params = Promise.resolve({ route: ["foo", "bar"] });
		const Child = () => <div data-testid="child">Child Content</div>;

		const { findByTestId } = render(
			await RootLayout({ params, children: <Child /> })
		);

		expect(await findByTestId("page-layout")).toBeInTheDocument();
		expect(await findByTestId("child")).toBeInTheDocument();
	});

	it("passes the route param to MainHeader", async () => {
		const params = Promise.resolve({ route: ["dynamic", "route"] });

		const { findByTestId } = render(
			await RootLayout({ params, children: <div /> })
		);

		const mainHeader = await findByTestId("main-header");
		expect(mainHeader).toHaveTextContent("dynamic/route");
	});

	it("renders correctly with empty route", async () => {
		const params = Promise.resolve({ route: [] });

		const { findByTestId } = render(
			await RootLayout({ params, children: <div data-testid="empty-child" /> })
		);

		expect(await findByTestId("main-header")).toHaveTextContent("");
		expect(await findByTestId("empty-child")).toBeInTheDocument();
	});
});
