import React from "react";
import { render, screen } from "@testing-library/react";
import { InputList } from "./input-list";
import { InputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../inputs";

// Mock styles
jest.mock("./input-list.module.scss", () => ({
	list: "list",
	listItem: "listItem",
}));

// Mock InputFactory
jest.mock("../input-factory", () => ({
	InputFactory: ({ data }: { data: InputProps }) => (
		<div data-testid="input-factory">{data.id}</div>
	),
}));

// Mock getParentId
jest.mock("../../../../utils/edit", () => ({
	getParentId: (id: string) => `parent-${id}`,
}));

describe("InputList", () => {
	const inputs: InputProps[] = [
		// @ts-expect-error - Mocking InputProps for testing
		{ id: "input1", label: "Input 1", type: "text" },
		// @ts-expect-error - Mocking InputProps for testing
		{ id: "input2", label: "Input 2", type: "number" },
	];

	it("renders a list of inputs with correct ids when createObject is true", () => {
		// @ts-expect-error - Mocking InputProps for testing
		render(<InputList id="formKey" inputs={inputs} createObject={true} />);
		const items = screen.getAllByTestId("input-factory");
		expect(items).toHaveLength(2);
		expect(items[0]).toHaveTextContent("formKey.input1");
		expect(items[1]).toHaveTextContent("formKey.input2");
	});

	it("renders a list of inputs with correct ids when createObject is false", () => {
		// @ts-expect-error - Mocking InputProps for testing
		render(<InputList id="formKey" inputs={inputs} createObject={false} />);
		const items = screen.getAllByTestId("input-factory");
		expect(items).toHaveLength(2);
		expect(items[0]).toHaveTextContent("parent-formKey.input1");
		expect(items[1]).toHaveTextContent("parent-formKey.input2");
	});

	it("renders an empty list when inputs is empty", () => {
		render(<InputList id="formKey" inputs={[]} type={EditInputs.inputList} />);
		expect(screen.queryByTestId("input-factory")).toBeNull();
	});

	it("applies the correct class names to ul and li", () => {
		// @ts-expect-error - Mocking InputProps for testing
		render(<InputList id="formKey" inputs={inputs} />);
		const ul = screen.getByRole("list");
		expect(ul).toHaveClass("list");
		const lis = screen.getAllByRole("listitem");
		lis.forEach((li) => expect(li).toHaveClass("listItem"));
	});
});
