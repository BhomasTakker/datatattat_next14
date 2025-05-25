import React from "react";
import { render, screen } from "@testing-library/react";
import { PageLayout } from "./page-layout";
import "@testing-library/jest-dom";

// Mock dependencies
jest.mock("../../../components/footer/main-footer", () => ({
	MainFooter: () => <footer data-testid="main-footer" />,
}));
jest.mock("../../../components/providers/Providers", () => ({
	Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@vercel/analytics/next", () => ({
	Analytics: () => <div data-testid="analytics" />,
}));
jest.mock("@vercel/speed-insights/next", () => ({
	SpeedInsights: () => <div data-testid="speed-insights" />,
}));
jest.mock("../../../lib/services/intialise-services", () => ({
	initialiseServices: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../../../fonts", () => ({
	geistMono: { variable: "geistMono-variable" },
	geistSans: { variable: "geistSans-variable" },
}));
jest.mock("./page-layout.module.scss", () => ({
	root: "page-layout-root",
}));

describe("PageLayout", () => {
	it("renders children and layout elements", async () => {
		const TestChild = () => <div data-testid="test-child">Hello</div>;

		const { container } = render(await PageLayout({ children: <TestChild /> }));

		// Render returns a React element, so we need to render it

		expect(screen.getByTestId("test-child")).toBeInTheDocument();
		expect(screen.getByTestId("main-footer")).toBeInTheDocument();
		expect(screen.getByTestId("analytics")).toBeInTheDocument();
		expect(screen.getByTestId("speed-insights")).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it("applies correct class names to body", async () => {
		const { container } = render(await PageLayout({ children: <div /> }));
		const geistSans = container.getElementsByClassName("geistSans-variable");
		expect(geistSans).toHaveLength(1);
		const geistMono = container.getElementsByClassName("geistMono-variable");
		expect(geistMono).toHaveLength(1);
		const page = container.getElementsByClassName("page-layout-root");
		expect(geistSans).toHaveLength(1);
	});

	describe("Snaps", () => {
		it("renders PageLayout unchanged", async () => {
			const { container } = render(await PageLayout({ children: <div /> }));
			expect(container).toMatchSnapshot();
		});
	});
});
