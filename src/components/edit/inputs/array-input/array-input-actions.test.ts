import { randomKeyGenerator } from "../../../../utils/edit";
import { add, onDelete, move } from "./array-input-actions";

jest.mock("../../../../utils/edit", () => ({
	randomKeyGenerator: jest.fn(() => "random-key"),
}));

describe("array-input-actions", () => {
	let setValue: jest.Mock;
	let getValues: jest.Mock;
	let setInputList: jest.Mock;
	let onDirty: jest.Mock;

	beforeEach(() => {
		setValue = jest.fn();
		getValues = jest.fn();
		setInputList = jest.fn();
		onDirty = jest.fn();
		jest.clearAllMocks();
	});

	describe("add", () => {
		it("should add a new object when createObject is true", () => {
			getValues.mockReturnValue([{ key: "a", foo: "bar" }]);
			const fn = add({
				setValue,
				getValues,
				setInputList,
				id: "test",
				inputId: "foo",
				createObject: true,
				isDirty: false,
			});
			fn();
			expect(setValue).toHaveBeenCalledWith("test", [
				{ key: "a", foo: "bar" },
				{ key: "random-key", foo: "" },
			]);
			expect(setInputList).toHaveBeenCalled();
		});

		it("should add a new string when createObject is false", () => {
			getValues.mockReturnValue(["a", "b"]);
			const fn = add({
				setValue,
				getValues,
				setInputList,
				id: "test",
				inputId: "foo",
				createObject: false,
				isDirty: false,
			});
			fn();
			expect(setValue).toHaveBeenCalledWith("test", ["a", "b", ""]);
			expect(setInputList).toHaveBeenCalled();
		});

		it("should handle empty initial array", () => {
			getValues.mockReturnValue(undefined);
			const fn = add({
				setValue,
				getValues,
				setInputList,
				id: "test",
				inputId: "foo",
				createObject: false,
				isDirty: false,
			});
			fn();
			expect(setValue).toHaveBeenCalledWith("test", [""]);
			expect(setInputList).toHaveBeenCalled();
		});
	});

	describe("onDelete", () => {
		it("should call onDirty and not delete if isDirty is true", () => {
			const fn = onDelete({
				// @ts-expect-error - Type 'string' is not assignable to type 'InputTypes'
				inputs: ["a", "b", "c"],
				setValue,
				setInputList,
				id: "test",
				isDirty: true,
				onDirty,
			});
			fn(1);
			expect(onDirty).toHaveBeenCalled();
			expect(setValue).not.toHaveBeenCalled();
			expect(setInputList).not.toHaveBeenCalled();
		});

		it("should delete the item at the given index", () => {
			const fn = onDelete({
				// @ts-expect-error - Type 'string' is not assignable to type 'InputTypes'
				inputs: ["a", "b", "c"],
				setValue,
				setInputList,
				id: "test",
				isDirty: false,
				onDirty,
			});
			fn(1);
			expect(setValue).toHaveBeenCalledWith("test", ["a", "c"]);
			expect(setInputList).toHaveBeenCalledWith(["a", "c"]);
		});
	});

	describe("move", () => {
		it("should call onDirty and not move if isDirty is true", () => {
			const fn = move({
				// @ts-expect-error - Type 'string' is not assignable to type 'InputTypes'
				inputs: ["a", "b", "c"],
				setValue,
				setInputList,
				id: "test",
				isDirty: true,
				onDirty,
			});
			fn(1, "up");
			expect(onDirty).toHaveBeenCalled();
			expect(setValue).not.toHaveBeenCalled();
			expect(setInputList).not.toHaveBeenCalled();
		});

		it("should not move up if index is 0", () => {
			const fn = move({
				// @ts-expect-error - Type 'string' is not assignable to type 'InputTypes'
				inputs: ["a", "b", "c"],
				setValue,
				setInputList,
				id: "test",
				isDirty: false,
				onDirty,
			});
			fn(0, "up");
			expect(setValue).not.toHaveBeenCalled();
			expect(setInputList).not.toHaveBeenCalled();
		});

		it("should not move down if index is last", () => {
			const fn = move({
				// @ts-expect-error - Type 'string' is not assignable to type 'InputTypes'
				inputs: ["a", "b", "c"],
				setValue,
				setInputList,
				id: "test",
				isDirty: false,
				onDirty,
			});
			fn(2, "down");
			expect(setValue).not.toHaveBeenCalled();
			expect(setInputList).not.toHaveBeenCalled();
		});

		it("should move item up", () => {
			const fn = move({
				// @ts-expect-error - Type 'string' is not assignable to type 'InputTypes'
				inputs: ["a", "b", "c"],
				setValue,
				setInputList,
				id: "test",
				isDirty: false,
				onDirty,
			});
			fn(1, "up");
			expect(setValue).toHaveBeenCalledWith("test", ["b", "a", "c"]);
			expect(setInputList).toHaveBeenCalledWith(["b", "a", "c"]);
		});

		it("should move item down", () => {
			const fn = move({
				// @ts-expect-error - Type 'string' is not assignable to type 'InputTypes'
				inputs: ["a", "b", "c"],
				setValue,
				setInputList,
				id: "test",
				isDirty: false,
				onDirty,
			});
			fn(1, "down");
			expect(setValue).toHaveBeenCalledWith("test", ["a", "c", "b"]);
			expect(setInputList).toHaveBeenCalledWith(["a", "c", "b"]);
		});
	});
});
