import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ToastContainer } from "./toast-container";

type SonnerProps = {
	richColors?: boolean;
};

jest.mock("sonner", () => {
	return {
		Toaster: ({ richColors }: SonnerProps) => {
			return (
				<h2 data-testid={richColors ? "rich-colors" : ""}>
					Sonner Mock Toaster Component
				</h2>
			);
		},
	};
});

describe("ToastContainer", () => {
	it("renders Sonner Toaster Component", async () => {
		render(ToastContainer());

		const mockComponent = screen.getByRole("heading", {
			level: 2,
			name: /sonner mock toaster component/i,
		});

		expect(mockComponent).toBeInTheDocument();
	});

	it("renders Sonner Toaster Component with richColors prop", async () => {
		render(ToastContainer());

		const mockComponent = screen.getByTestId("rich-colors");

		expect(mockComponent).toBeInTheDocument();
	});
});
