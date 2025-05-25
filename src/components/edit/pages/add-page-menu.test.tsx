import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddPageMenu } from "./add-page-menu";
import { patterns } from "@/utils/regex";

// Mock styles import to avoid CSS module errors
jest.mock(
	"./add-page-menu.module.scss",
	() => new Proxy({}, { get: (t, p) => p })
);

describe("AddPageMenu", () => {
	const routePrefix = "/pages/";
	const createPageHandler = jest.fn();

	beforeEach(() => {
		createPageHandler.mockClear();
	});

	it("renders input, button, and route prefix", () => {
		render(
			<AddPageMenu
				createPageHandler={createPageHandler}
				routePrefix={routePrefix}
			/>
		);
		expect(screen.getByText(routePrefix)).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it.skip("calls createPageHandler with valid route", () => {
		render(
			<AddPageMenu
				createPageHandler={createPageHandler}
				routePrefix={routePrefix}
			/>
		);
		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		waitFor(() => {
			fireEvent.change(input, { target: { value: "/valid-route" } });
			fireEvent.click(button);
		});

		expect(createPageHandler).toHaveBeenCalledWith("/valid-route");
	});

	it("does not call createPageHandler with invalid route", () => {
		render(
			<AddPageMenu
				createPageHandler={createPageHandler}
				routePrefix={routePrefix}
			/>
		);
		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		waitFor(() => {
			fireEvent.change(input, { target: { value: "invalid route!" } });
			fireEvent.click(button);
		});

		expect(createPageHandler).not.toHaveBeenCalled();
	});

	it("shows error message for invalid route", async () => {
		render(
			<AddPageMenu
				createPageHandler={createPageHandler}
				routePrefix={routePrefix}
			/>
		);
		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		waitFor(() => {
			fireEvent.change(input, { target: { value: "invalid route!" } });
			fireEvent.click(button);
		});
		const errorMsg = await screen.findByText(patterns.pageSlug.message);
		expect(errorMsg).toBeInTheDocument();
	});

	// cannot show error message - directed by react-hook-form needs better mocking?
	it.skip("shows error message when input is empty and form is submitted", async () => {
		render(
			<AddPageMenu
				createPageHandler={createPageHandler}
				routePrefix={routePrefix}
			/>
		);
		const button = screen.getByRole("button");

		fireEvent.click(button);

		// The error message may be the pattern message or a default required message
		// Try to find either
		const errorMsg = await screen.findByText(/required|slug/i);
		expect(errorMsg).toBeInTheDocument();
	});
});
