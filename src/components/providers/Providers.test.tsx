import React from "react";
import { render } from "@testing-library/react";
import { Providers } from "./Providers";

// Mock AuthProvider to observe its usage
jest.mock("../header/auth/auth-provider", () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mock-auth-provider">{children}</div>
	),
}));

describe("Providers", () => {
	it("renders children inside AuthProvider", () => {
		const { getByTestId, getByText } = render(
			<Providers>
				<span>Test Child</span>
			</Providers>
		);
		expect(getByTestId("mock-auth-provider")).toBeInTheDocument();
		expect(getByText("Test Child")).toBeInTheDocument();
	});
});
