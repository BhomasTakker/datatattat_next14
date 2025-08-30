import {
	createDateSortTransducer,
	createNumberSortTransducer,
	getSortTransducer,
} from "./index";
import { SortDirection, SortType } from "./types";

// Mock the getNestedValue utility
jest.mock("../../../../utils/object", () => ({
	getNestedValue: jest.fn(),
}));

import { getNestedValue } from "../../../../utils/object";

describe("Sort Transducers", () => {
	const mockGetNestedValue = getNestedValue as jest.MockedFunction<
		typeof getNestedValue
	>;

	beforeEach(() => {
		mockGetNestedValue.mockClear();
	});

	// Helper reducer function for testing
	const arrayReducer = <T>(acc: T[], value: T): T[] => [...acc, value];

	describe("createDateSortTransducer", () => {
		it("should sort dates in ascending order", () => {
			const testData = [
				{ id: 1, date: "2023-12-01" },
				{ id: 2, date: "2023-11-15" },
				{ id: 3, date: "2023-12-15" },
			];

			// Mock getNestedValue to return the date values consistently
			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.date;
			});

			const transducer = createDateSortTransducer({
				id: "date",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([
				{ id: 2, date: "2023-11-15" },
				{ id: 1, date: "2023-12-01" },
				{ id: 3, date: "2023-12-15" },
			]);

			// Verify getNestedValue was called with correct parameters
			expect(mockGetNestedValue).toHaveBeenCalledWith("date", expect.any(Object));
		});

		it("should sort dates in descending order", () => {
			const testData = [
				{ id: 1, date: "2023-12-01" },
				{ id: 2, date: "2023-11-15" },
				{ id: 3, date: "2023-12-15" },
			];

			// Mock getNestedValue to return the date values consistently
			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.date;
			});

			const transducer = createDateSortTransducer({
				id: "date",
				type: SortDirection.Descending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([
				{ id: 3, date: "2023-12-15" },
				{ id: 1, date: "2023-12-01" },
				{ id: 2, date: "2023-11-15" },
			]);
		});

		it("should handle nested date properties", () => {
			const testData = [
				{ id: 1, metadata: { createdAt: "2023-12-01" } },
				{ id: 2, metadata: { createdAt: "2023-11-15" } },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				if (key === "metadata.createdAt") {
					return obj.metadata.createdAt;
				}
				return null;
			});

			const transducer = createDateSortTransducer({
				id: "metadata.createdAt",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(mockGetNestedValue).toHaveBeenCalledWith(
				"metadata.createdAt",
				expect.any(Object)
			);
		});

		it("should handle invalid date strings", () => {
			const testData = [
				{ id: 1, date: "invalid-date" },
				{ id: 2, date: "2023-11-15" },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.date;
			});

			const transducer = createDateSortTransducer({
				id: "date",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			// Should handle invalid dates gracefully
			expect(result).toHaveLength(2);
		});
	});

	describe("createNumberSortTransducer", () => {
		it("should sort numbers in ascending order", () => {
			const testData = [
				{ id: 1, value: 30 },
				{ id: 2, value: 10 },
				{ id: 3, value: 20 },
			];

			// Mock getNestedValue to return the numeric values consistently
			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([
				{ id: 2, value: 10 },
				{ id: 3, value: 20 },
				{ id: 1, value: 30 },
			]);

			expect(mockGetNestedValue).toHaveBeenCalledWith("value", expect.any(Object));
		});

		it("should sort numbers in descending order", () => {
			const testData = [
				{ id: 1, value: 30 },
				{ id: 2, value: 10 },
				{ id: 3, value: 20 },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Descending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([
				{ id: 1, value: 30 },
				{ id: 3, value: 20 },
				{ id: 2, value: 10 },
			]);
		});

		it("should handle string numbers", () => {
			const testData = [
				{ id: 1, value: "30" },
				{ id: 2, value: "10" },
				{ id: 3, value: "20" },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([
				{ id: 2, value: "10" },
				{ id: 3, value: "20" },
				{ id: 1, value: "30" },
			]);
		});

		it("should handle nested numeric properties", () => {
			const testData = [
				{ id: 1, stats: { score: 85 } },
				{ id: 2, stats: { score: 92 } },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				if (key === "stats.score") {
					return obj.stats.score;
				}
				return null;
			});

			const transducer = createNumberSortTransducer({
				id: "stats.score",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			testData.reduce(reducer, []);

			expect(mockGetNestedValue).toHaveBeenCalledWith(
				"stats.score",
				expect.any(Object)
			);
		});

		it("should handle NaN values", () => {
			const testData = [
				{ id: 1, value: "not-a-number" },
				{ id: 2, value: "20" },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			// Should handle NaN values gracefully
			expect(result).toHaveLength(2);
		});

		it("should handle decimal numbers", () => {
			const testData = [
				{ id: 1, value: 3.14 },
				{ id: 2, value: 2.71 },
				{ id: 3, value: 1.41 },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([
				{ id: 3, value: 1.41 },
				{ id: 2, value: 2.71 },
				{ id: 1, value: 3.14 },
			]);
		});
	});

	describe("getSortTransducer", () => {
		it("should return date sort transducer for SortType.Date", () => {
			const result = getSortTransducer(
				SortType.Date,
				"date",
				SortDirection.Ascending
			);

			expect(result).toBeDefined();
			expect(typeof result).toBe("function");
		});

		it("should return number sort transducer for SortType.Number", () => {
			const result = getSortTransducer(
				SortType.Number,
				"value",
				SortDirection.Descending
			);

			expect(result).toBeDefined();
			expect(typeof result).toBe("function");
		});

		it("should return null for unsupported sort types", () => {
			const result = getSortTransducer(
				SortType.String,
				"text",
				SortDirection.Ascending
			);

			expect(result).toBeNull();
		});

		it("should create transducer that works with both directions", () => {
			const testData: Array<{ id: number; value: number }> = [
				{ id: 1, value: 30 },
				{ id: 2, value: 10 },
			];

			// Test ascending
			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const ascendingTransducer = getSortTransducer(
				SortType.Number,
				"value",
				SortDirection.Ascending
			);

			if (ascendingTransducer) {
				const reducer = ascendingTransducer(arrayReducer);
				const ascResult = testData.reduce(reducer, []);
				expect((ascResult[0] as { id: number; value: number }).value).toBe(10);
				expect((ascResult[1] as { id: number; value: number }).value).toBe(30);
			}

			// Test descending
			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const descendingTransducer = getSortTransducer(
				SortType.Number,
				"value",
				SortDirection.Descending
			);

			if (descendingTransducer) {
				const reducer = descendingTransducer(arrayReducer);
				const descResult = testData.reduce(reducer, []);
				expect((descResult[0] as { id: number; value: number }).value).toBe(30);
				expect((descResult[1] as { id: number; value: number }).value).toBe(10);
			}
		});

		it("should work with complex nested paths", () => {
			const testData = [
				{ id: 1, user: { profile: { age: 25 } } },
				{ id: 2, user: { profile: { age: 30 } } },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				if (key === "user.profile.age") {
					return obj.user.profile.age;
				}
				return null;
			});

			const transducer = getSortTransducer(
				SortType.Number,
				"user.profile.age",
				SortDirection.Ascending
			);

			if (transducer) {
				const reducer = transducer(arrayReducer);
				testData.reduce(reducer, []);

				expect(mockGetNestedValue).toHaveBeenCalledWith(
					"user.profile.age",
					expect.any(Object)
				);
			}
		});
	});

	describe("Edge Cases", () => {
		it("should handle empty arrays", () => {
			const testData: Array<{ value: number }> = [];

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([]);
		});

		it("should handle single item arrays", () => {
			const testData = [{ id: 1, value: 42 }];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toEqual([{ id: 1, value: 42 }]);
		});

		it("should handle identical values", () => {
			const testData: Array<{ id: number; value: number }> = [
				{ id: 1, value: 10 },
				{ id: 2, value: 10 },
				{ id: 3, value: 10 },
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []) as Array<{ id: number; value: number }>;

			expect(result).toHaveLength(3);
			expect(result.every(item => item.value === 10)).toBe(true);
		});

		it("should handle null and undefined values from getNestedValue", () => {
			const testData = [
				{ id: 1, value: 10 },
				{ id: 2 }, // missing value property
			];

			mockGetNestedValue.mockImplementation((key, obj) => {
				return obj.value || null;
			});

			const transducer = createNumberSortTransducer({
				id: "value",
				type: SortDirection.Ascending,
			});

			const reducer = transducer(arrayReducer);
			const result = testData.reduce(reducer, []);

			expect(result).toHaveLength(2);
		});
	});
});
