import { createSearchAggregate } from "./searchAggregate";
import * as searchQueryFunctions from "./search-query-functions";
import * as aggregatorFunctions from "./aggregator-functions";

// In order to spy on these we needed to mock the module first
// https://stackoverflow.com/questions/67872622/jest-spyon-not-working-on-index-file-cannot-redefine-property
jest.mock("./search-query-functions", () => {
	return {
		__esModule: true, //    <----- this __esModule: true is important
		...jest.requireActual("./search-query-functions"),
	};
});

jest.mock("./aggregator-functions", () => {
	return {
		__esModule: true, //    <----- this __esModule: true is important
		...jest.requireActual("./aggregator-functions"),
	};
});

const getLimitSpy = jest.spyOn(searchQueryFunctions, "getLimit");

describe("createSearchAggregate", () => {
	let aggregator: any[];

	beforeEach(() => {
		aggregator = [];
		jest.clearAllMocks();
	});

	it("should add filters for variant, region, and language", () => {
		const spyAddFilter = jest.spyOn(searchQueryFunctions, "addFilter");
		const queryParams = {
			variant: "news",
			region: "us",
			language: "en",
		} as any;

		createSearchAggregate(queryParams, aggregator);

		expect(spyAddFilter).toHaveBeenCalledWith(
			expect.any(Array),
			"news",
			"variant"
		);
		expect(spyAddFilter).toHaveBeenCalledWith(
			expect.any(Array),
			"us",
			"details.region"
		);
		expect(spyAddFilter).toHaveBeenCalledWith(
			expect.any(Array),
			"en",
			"details.languge"
		);
	});

	it("should add must, mustNot, should, and filterContain filters", () => {
		const spyAddFilter = jest.spyOn(searchQueryFunctions, "addFilter");
		const queryParams = {
			mustContain: ["foo"],
			mustNotContain: ["bar"],
			shouldContain: ["baz"],
			filterContain: ["qux"],
		} as any;

		createSearchAggregate(queryParams, aggregator);

		expect(spyAddFilter).toHaveBeenCalledWith(
			expect.any(Array),
			"foo",
			"title"
		);
		expect(spyAddFilter).toHaveBeenCalledWith(
			expect.any(Array),
			"bar",
			"title"
		);
		expect(spyAddFilter).toHaveBeenCalledWith(
			expect.any(Array),
			"baz",
			"title"
		);
		expect(spyAddFilter).toHaveBeenCalledWith(
			expect.any(Array),
			"qux",
			"title",
			"text"
		);
	});

	it("should call addDateRange, addWithinTimeFrame, and addDurationRange", () => {
		const spyAddDateRange = jest.spyOn(searchQueryFunctions, "addDateRange");
		const spyAddWithinTimeFrame = jest.spyOn(
			searchQueryFunctions,
			"addWithinTimeFrame"
		);
		const spyAddDurationRange = jest.spyOn(
			searchQueryFunctions,
			"addDurationRange"
		);
		const queryParams = {} as any;

		createSearchAggregate(queryParams, aggregator);

		expect(spyAddDateRange).toHaveBeenCalledWith(
			expect.any(Array),
			queryParams
		);
		expect(spyAddWithinTimeFrame).toHaveBeenCalledWith(
			expect.any(Array),
			queryParams
		);
		expect(spyAddDurationRange).toHaveBeenCalledWith(
			expect.any(Array),
			queryParams
		);
	});

	it("should push $search and $limit stages to aggregator", () => {
		const queryParams = {} as any;
		const result = createSearchAggregate(queryParams, aggregator);

		expect(aggregator.some((stage) => stage.$search)).toBe(true);
		expect(aggregator.some((stage) => stage.$limit !== undefined)).toBe(true);
		expect(result).toBe(aggregator);
	});

	it("should call addProviderLookup, addFields, and matchTrust", () => {
		const spyAddProviderLookup = jest.spyOn(
			aggregatorFunctions,
			"addProviderLookup"
		);
		const spyAddFields = jest.spyOn(aggregatorFunctions, "addFields");
		const spyMatchTrust = jest.spyOn(aggregatorFunctions, "matchTrust");
		const queryParams = {
			trustHigher: 5,
			trustLower: 1,
		} as any;

		createSearchAggregate(queryParams, aggregator);

		expect(spyAddProviderLookup).toHaveBeenCalledWith(aggregator);
		expect(spyAddFields).toHaveBeenCalledWith(aggregator);
		expect(spyMatchTrust).toHaveBeenCalledWith(aggregator, 5, 1);
	});

	it("should set minimumShouldMatch in $search compound", () => {
		jest
			.spyOn(searchQueryFunctions, "addMinimumShouldMatch")
			.mockReturnValue(2);
		const queryParams = {} as any;

		createSearchAggregate(queryParams, aggregator);

		const searchStage = aggregator.find((stage) => stage.$search);
		expect(searchStage.$search.compound.minimumShouldMatch).toBe(2);
	});

	it("should handle empty queryParams gracefully", () => {
		expect(() => createSearchAggregate({} as any, aggregator)).not.toThrow();
	});

	it("should use getLimit for $limit stage", () => {
		// jest.spyOn(searchQueryFunctions, "getLimit")
		getLimitSpy.mockReturnValueOnce(42);
		const queryParams = {} as any;

		createSearchAggregate(queryParams, aggregator);

		const limitStage = aggregator.find((stage) => stage.$limit !== undefined);
		expect(limitStage.$limit).toBe(42);
	});
});
