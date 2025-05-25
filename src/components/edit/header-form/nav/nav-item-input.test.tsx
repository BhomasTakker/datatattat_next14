import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { NavItemInput } from "./nav-item-input";
import { IPage } from "@/types/page";

// Mock styles import
jest.mock("./nav-item-input.module.scss", () => ({
	root: "root",
	inputs: "inputs",
	input: "input",
	controls: "controls",
	icon: "icon",
}));

const pages: IPage[] = [
	// @ts-expect-error - mock data
	{ route: "/home", id: "1", title: "Home" },
	// @ts-expect-error - mock data
	{ route: "/about", id: "2", title: "About" },
];

const link = { label: "Test Label", route: "/about" };

const renderWithForm = (props = {}) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm();
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(
		<NavItemInput
			link={link}
			index={0}
			onMove={jest.fn()}
			onDelete={jest.fn()}
			pages={pages}
			{...props}
		/>,
		{ wrapper: Wrapper }
	);
};

describe("NavItemInput", () => {
	it("renders label and route inputs", () => {
		renderWithForm();
		expect(screen.getByLabelText(/Label/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Route/i)).toBeInTheDocument();
	});

	it("renders the correct default label value", () => {
		renderWithForm();
		const input = screen.getByLabelText(/Label/i) as HTMLInputElement;
		expect(input.value).toBe("Test Label");
	});

	it("renders all page options in the select", () => {
		renderWithForm();
		const select = screen.getByLabelText(/Route/i) as HTMLSelectElement;
		expect(select).toBeInTheDocument();
		expect(screen.getByText("Select a route")).toBeInTheDocument();
		expect(screen.getByText("/home")).toBeInTheDocument();
		expect(screen.getByText("/about")).toBeInTheDocument();
	});

	it("selects the correct route option", () => {
		renderWithForm();
		const select = screen.getByLabelText(/Route/i) as HTMLSelectElement;
		expect(select.value).toBe("/about");
	});

	it("calls onMove with 'up' when up arrow is clicked", () => {
		const onMove = jest.fn();
		renderWithForm({ onMove });
		const element = screen.getByTestId("move-up");
		fireEvent.click(element); // Up arrow
		expect(onMove).toHaveBeenCalledWith(0, "up");
	});

	it("calls onMove with 'down' when down arrow is clicked", () => {
		const onMove = jest.fn();
		renderWithForm({ onMove });
		const element = screen.getByTestId("move-down");
		fireEvent.click(element); // Down arrow
		expect(onMove).toHaveBeenCalledWith(0, "down");
	});

	it("calls onDelete when delete icon is clicked", () => {
		const onDelete = jest.fn();
		renderWithForm({ onDelete });
		const element = screen.getByTestId("delete");
		fireEvent.click(element); // Delete icon
		expect(onDelete).toHaveBeenCalledWith(0);
	});

	describe("Snaps", () => {
		it("renders NavItemInput unchanged", async () => {
			const { container } = renderWithForm();
			expect(container).toMatchSnapshot();
		});
	});
});
