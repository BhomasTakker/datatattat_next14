/**
 * @jest-environment node
 */

import "@testing-library/jest-dom";
import { cloneDeep, cloneDeepSerializable } from "./object";

const MOCK = { a: 1, b: 2 };

const structuredCloneSpy = jest.spyOn(global, "structuredClone");
const stringifySpy = jest.spyOn(JSON, "stringify");
const parseSpy = jest.spyOn(JSON, "parse");

describe("object utils test suite", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe("cloneDeepSerializable", () => {
		it("should clone object using json parse & stringify", () => {
			const clonedObj = cloneDeepSerializable(MOCK);
			expect(clonedObj).toEqual(MOCK);
		});

		it("cloned object should be a new object", () => {
			const clonedObj = cloneDeepSerializable(MOCK);
			expect(MOCK === clonedObj).toBeFalsy();
		});

		it("should call stringify & parse", () => {
			cloneDeepSerializable(MOCK);
			expect(stringifySpy).toHaveBeenCalledTimes(1);
			expect(parseSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe("cloneDeep", () => {
		it("should clone object", () => {
			const clonedObj = cloneDeep(MOCK);
			expect(clonedObj).toEqual(MOCK);
		});

		it("cloned object should be a new object", () => {
			const clonedObj = cloneDeep(MOCK);
			expect(MOCK === clonedObj).toBeFalsy();
		});

		it("should call structured clone", () => {
			cloneDeep(MOCK);
			expect(structuredCloneSpy).toHaveBeenCalledTimes(1);
		});

		// how to test fallback to cloneDeepSerializable??
		it("should call cloneDeepSerializable if no structuredClone", () => {
			const structuredClone = global.structuredClone;
			// @ts-expect-error - temporary override
			global.structuredClone = undefined;
			cloneDeep(MOCK);
			expect(structuredCloneSpy).toHaveBeenCalledTimes(0);
			expect(stringifySpy).toHaveBeenCalledTimes(1);
			expect(parseSpy).toHaveBeenCalledTimes(1);
			global.structuredClone = structuredClone;
		});

		it("should call structured clone2", () => {
			cloneDeep(MOCK);
			expect(structuredCloneSpy).toHaveBeenCalledTimes(1);
		});
	});
});
