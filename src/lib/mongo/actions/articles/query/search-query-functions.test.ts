import {
	getLimit,
	addFilter,
	addDurationRange,
	addDateRange,
	addWithinTimeFrame,
	addMinimumShouldMatch,
	addSort,
} from "./search-query-functions";

describe("search-query-functions", () => {
	describe("getLimit", () => {
		it("returns the limit if within HARD_LIMIT", () => {
			expect(getLimit({ limit: 10 } as any)).toBe(10);
		});

		it("returns HARD_LIMIT if limit exceeds HARD_LIMIT", () => {
			expect(getLimit({ limit: 200 } as any)).toBe(100);
		});

		it("returns HARD_LIMIT if limit is not a number", () => {
			expect(getLimit({ limit: "abc" } as any)).toBe(100);
		});

		it("returns HARD_LIMIT if limit is undefined", () => {
			expect(getLimit({} as any)).toBe(100);
		});
	});

	describe("addFilter", () => {
		it("adds a filter when query is truthy", () => {
			const filter: any[] = [];
			addFilter(filter, "test", "field");
			expect(filter).toHaveLength(1);
			expect(filter[0]).toEqual({
				text: { query: "test", path: "field" },
			});
		});

		it("does not add a filter when query is falsy", () => {
			const filter: any[] = [];
			addFilter(filter, "", "field");
			expect(filter).toHaveLength(0);
		});

		it("uses custom type", () => {
			const filter: any[] = [];
			addFilter(filter, "test", "field", "wildcard");
			expect(filter[0]).toEqual({
				wildcard: { query: "test", path: "field" },
			});
		});
	});

	describe("addDurationRange", () => {
		it("adds range filter with both durationHigher and durationLower", () => {
			const filter: any[] = [];
			addDurationRange(filter, {
				durationHigher: 10,
				durationLower: 20,
			} as any);
			expect(filter[0]).toEqual({
				range: {
					path: "media.duration",
					gt: 10,
					lt: 20,
				},
			});
		});

		it("adds range filter with only durationHigher", () => {
			const filter: any[] = [];
			addDurationRange(filter, { durationHigher: 15 } as any);
			expect(filter[0]).toEqual({
				range: {
					path: "media.duration",
					gt: 15,
					lt: undefined,
				},
			});
		});

		it("does not add filter if neither durationHigher nor durationLower", () => {
			const filter: any[] = [];
			addDurationRange(filter, {} as any);
			expect(filter).toHaveLength(0);
		});
	});

	describe("addDateRange", () => {
		it("adds range filter with both before and after", () => {
			const filter: any[] = [];
			addDateRange(filter, {
				before: "2023-01-01",
				after: "2022-01-01",
			} as any);
			expect(filter[0].range.path).toBe("details.published");
			expect(filter[0].range.gt).toEqual(new Date("2022-01-01"));
			expect(filter[0].range.lt).toEqual(new Date("2023-01-01"));
		});

		it("adds range filter with only before", () => {
			const filter: any[] = [];
			addDateRange(filter, { before: "2023-01-01" } as any);
			expect(filter[0].range.lt).toEqual(new Date("2023-01-01"));
			expect(filter[0].range.gt).toBeUndefined();
		});

		it("returns filter unchanged if neither before nor after", () => {
			const filter: any[] = [];
			const result = addDateRange(filter, {} as any);
			expect(result).toBe(filter);
			expect(filter).toHaveLength(0);
		});
	});

	describe("addWithinTimeFrame", () => {
		it("adds a range filter for a valid 'within' value", () => {
			const filter: any[] = [];
			addWithinTimeFrame(filter, { within: "1 day" } as any);
			expect(filter[0].range.path).toBe("details.published");
			expect(filter[0].range.gt).toBeInstanceOf(Date);
		});

		it("does not add filter for invalid 'within' value", () => {
			const filter: any[] = [];
			addWithinTimeFrame(filter, { within: "not a time" } as any);
			expect(filter).toHaveLength(0);
		});

		it("does nothing if 'within' is not provided", () => {
			const filter: any[] = [];
			addWithinTimeFrame(filter, {} as any);
			expect(filter).toHaveLength(0);
		});
	});

	describe("addMinimumShouldMatch", () => {
		it("returns minimumShouldMatch if valid and enough shouldContain", () => {
			expect(
				addMinimumShouldMatch({
					minimumShouldMatch: 2,
					shouldContain: ["a", "b", "c"],
				} as any)
			).toBe(2);
		});

		it("returns 0 if minimumShouldMatch is invalid", () => {
			expect(
				addMinimumShouldMatch({
					minimumShouldMatch: -1,
					shouldContain: ["a", "b"],
				} as any)
			).toBe(0);
			expect(
				addMinimumShouldMatch({
					minimumShouldMatch: 101,
					shouldContain: ["a", "b"],
				} as any)
			).toBe(0);
		});

		it("returns 0 if shouldContain is not enough", () => {
			expect(
				addMinimumShouldMatch({
					minimumShouldMatch: 3,
					shouldContain: ["a"],
				} as any)
			).toBe(0);
		});

		it("returns 0 if minimumShouldMatch is not provided", () => {
			expect(addMinimumShouldMatch({ shouldContain: ["a"] } as any)).toBe(0);
		});
	});

	describe("addSort", () => {
		it("returns relevance sort", () => {
			expect(addSort({ sort: "relevance" } as any)).toEqual({
				score: { $meta: "searchScore", order: 1 },
			});
		});

		it("returns date ascending sort", () => {
			expect(addSort({ sort: "date-ascending" } as any)).toEqual({
				"details.published": 1,
			});
		});

		it("returns date descending sort", () => {
			expect(addSort({ sort: "date-descending" } as any)).toEqual({
				"details.published": -1,
			});
		});

		it("returns undefined for unknown sort", () => {
			expect(addSort({ sort: "unknown" } as any)).toBeUndefined();
			expect(addSort({} as any)).toBeUndefined();
		});
	});
});
