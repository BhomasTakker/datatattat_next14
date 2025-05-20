import { filterLimit } from "./limit";

describe("filterLimit", () => {
	it("should return the same array if length is less than limit", () => {
		const items = Array.from({ length: 10 }, (_, i) => i);
		expect(filterLimit(items)).toEqual(items);
	});

	it("should return the same array if length is equal to limit", () => {
		const items = Array.from({ length: 50 }, (_, i) => i);
		expect(filterLimit(items)).toEqual(items);
	});

	it("should return a sliced array if length is greater than limit", () => {
		const items = Array.from({ length: 100 }, (_, i) => i);
		const result = filterLimit(items);
		expect(result).toHaveLength(50);
		expect(result).toEqual(items.slice(0, 50));
	});

	it("should return an empty array if input is empty", () => {
		expect(filterLimit([])).toEqual([]);
	});

	it("should not mutate the original array", () => {
		const items = Array.from({ length: 60 }, (_, i) => i);
		const itemsCopy = [...items];
		filterLimit(items);
		expect(items).toEqual(itemsCopy);
	});
});
