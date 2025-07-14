import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PageForm } from "./page-form";

jest.mock("../config/page/page-config", () => ({
	PAGE_CONFIG: [
		{ id: "meta", label: "Meta" },
		{ id: "profile", label: "Profile" },
		{ id: "content", label: "Content" },
	],
}));

// Mock dependencies
jest.mock("../inputs/input-factory", () => ({
	InputFactory: ({ data }: any) => (
		<div data-testid={`input-factory-${data.id}`} />
	),
}));
jest.mock("../../../components/ui/button", () => ({
	Button: (props: any) => <button {...props} />,
}));
jest.mock("./debug-component", () => ({
	DebugComponent: () => <div data-testid="debug-component" />,
}));
jest.mock("./page-form.module.scss", () => ({
	form: "form",
}));

describe("PageForm", () => {
	const submitHandler = jest.fn().mockResolvedValue(undefined);

	beforeEach(() => {
		submitHandler.mockClear();
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the form and all input factories", () => {
		render(<PageForm submitHandler={submitHandler} />);
		expect(screen.getByTestId("input-factory-meta")).toBeInTheDocument();
		expect(screen.getByTestId("input-factory-profile")).toBeInTheDocument();
		expect(screen.getByTestId("input-factory-content")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
		expect(screen.getByTestId("debug-component")).toBeInTheDocument();
	});

	it("calls submitHandler on form submit", async () => {
		render(<PageForm submitHandler={submitHandler} />);
		const button = screen.getByRole("button", { name: /submit/i });
		fireEvent.click(button);
		expect(submitHandler).toHaveBeenCalled();
	});

	it("passes correct ids to InputFactory", () => {
		render(<PageForm submitHandler={submitHandler} />);
		expect(screen.getByTestId("input-factory-meta")).toBeInTheDocument();
		expect(screen.getByTestId("input-factory-profile")).toBeInTheDocument();
		expect(screen.getByTestId("input-factory-content")).toBeInTheDocument();
	});
});
