import React from "react";
import { render } from "@testing-library/react";
import { AssignInputId } from "./assign-id";
import { InputFactory } from "../input-factory";
import * as editUtils from "../../../../utils/edit";
import { EditInputs } from "../inputs";

jest.mock("../../../../utils/edit", () => ({
	__esModule: true,
	...jest.requireActual("../../../../utils/edit"),
}));

const getParentIdSpy = jest.spyOn(editUtils, "getParentId");

jest.mock("../input-factory", () => ({
	InputFactory: jest.fn(() => <div data-testid="input-factory" />),
}));

describe("AssignInputId", () => {
	const defaultProps = {
		id: "parentId",
		input: { type: "text", label: "Test Label" },
		assignId: "childId",
		useParent: false,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders InputFactory with correct id when useParent is false", () => {
		render(
			<AssignInputId
				type={EditInputs.assignId}
				{...defaultProps}
				// @ts-expect-error - missing props
				input={{ type: "type" }}
			/>
		);
		expect(InputFactory).toHaveBeenCalledWith(
			expect.objectContaining({
				data: expect.objectContaining({
					id: "parentId.childId",
					type: "type",
				}),
			}),
			undefined
		);
	});

	it("renders InputFactory with correct id when useParent is true", () => {
		getParentIdSpy.mockReturnValue("parentOnly");
		render(
			<AssignInputId
				{...defaultProps}
				useParent={true}
				// @ts-expect-error - missing props
				input={{ type: EditInputs.assignId, label: "Test Label" }}
				type={EditInputs.assignId}
			/>
		);
		expect(getParentIdSpy).toHaveBeenCalledWith("parentId");
		expect(InputFactory).toHaveBeenCalledWith(
			{
				data: {
					id: "parentOnly.childId",
					label: "Test Label",
					type: EditInputs.assignId,
				},
			},
			undefined
		);
	});

	it("returns null if input.type is falsy", () => {
		const { container } = render(
			<AssignInputId
				{...defaultProps}
				// @ts-expect-error - undefined type
				input={{ ...defaultProps.input, type: undefined }}
			/>
		);
		expect(container.firstChild).toBeNull();
		expect(InputFactory).not.toHaveBeenCalled();
	});

	it("passes all input props to InputFactory data", () => {
		const input = { type: "number", label: "Num", extra: "foo" };
		render(
			<AssignInputId
				{...defaultProps}
				// @ts-expect-error - missing props
				input={input}
				type={EditInputs.assignId}
			/>
		);
		expect(InputFactory).toHaveBeenCalledWith(
			expect.objectContaining({
				data: expect.objectContaining({
					type: "number",
					label: "Num",
					extra: "foo",
				}),
			}),
			undefined
		);
	});
});
