import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { ObjectSelect } from "./object-select";
import { ObjectSelectProps } from "@/types/edit/inputs/inputs";

// Mock dependencies
jest.mock("../select-input/select-input", () => ({
	SelectInput: (props: any) => (
		<div data-testid="select-input">{props.label}</div>
	),
}));
jest.mock("../input-factory", () => ({
	InputFactory: (props: any) => (
		<div data-testid="input-factory">{JSON.stringify(props.data)}</div>
	),
}));
jest.mock("../../../../utils/edit", () => ({
	getParentId: (id: string) => id.split(".")[0],
}));

const renderWithForm = (ui: React.ReactElement, defaultValues = {}) => {
	const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
		const methods = useForm({ defaultValues });
		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	return render(ui, { wrapper: Wrapper });
};

describe("ObjectSelect", () => {
	const options = [
		{ value: "a", label: "Option A" },
		{ value: "b", label: "Option B" },
	];
	const optionMap = new Map([
		["a", { foo: "bar" }],
		["b", { foo: "baz" }],
	]);

	const baseProps: Omit<ObjectSelectProps, "type"> = {
		id: "testId",
		label: "Test Label",
		// @ts-expect-error - mock data
		options,
		// @ts-expect-error - mock data
		optionMap,
		optionId: "child",
		required: true,
	};

	it("renders SelectInput with label", () => {
		renderWithForm(<ObjectSelect {...baseProps} />);
		expect(screen.getByTestId("select-input")).toHaveTextContent("Test Label");
	});

	it("renders InputFactory when selectedOption exists in optionMap", () => {
		renderWithForm(<ObjectSelect {...baseProps} />, { testId: "a" });
		expect(screen.getByTestId("input-factory")).toHaveTextContent(
			'"foo":"bar"'
		);
	});

	it("does not render InputFactory when selectedOption does not exist", () => {
		renderWithForm(<ObjectSelect {...baseProps} />, { testId: "nonexistent" });
		expect(screen.queryByTestId("input-factory")).toBeNull();
	});

	it("uses defaultValue if no value is set", () => {
		renderWithForm(<ObjectSelect {...baseProps} defaultValue="b" />);
		expect(screen.getByTestId("input-factory")).toHaveTextContent(
			'"foo":"baz"'
		);
	});

	it("passes correct id to InputFactory data", () => {
		renderWithForm(<ObjectSelect {...baseProps} />, { testId: "a" });
		// parentId is "testId", optionId is "child", so id should be "testId.child"
		expect(screen.getByTestId("input-factory")).toHaveTextContent(
			'"id":"testId.child"'
		);
	});

	it("renders without crashing when optionId is not provided", () => {
		renderWithForm(
			<ObjectSelect {...{ ...baseProps, optionId: undefined }} />,
			{ testId: "a" }
		);
		expect(screen.getByTestId("input-factory")).toBeInTheDocument();
	});
});
