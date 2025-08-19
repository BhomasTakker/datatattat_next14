import {
	getComponentQueries,
	getWithConfig,
	QueryOptions,
} from "./_with-config";
import { EditInputs } from "../../inputs/inputs";

// Mock configs for dependencies
jest.mock("./rss/rss-config", () => ({
	RSS_CONFIG: { id: "rss-config" },
}));
jest.mock("./html/meta-config", () => ({
	HTML_META_QUERY_CONFIG: { id: "html-meta-config" },
}));
jest.mock("./api/api-base-config", () => ({
	getAPIConfig: jest.fn((options) => ({ id: "api-config", ...options })),
	APIOptions: { A: "A", B: "B" },
}));

describe("getComponentQueries", () => {
	it("returns a Map with all query options", () => {
		const queries = getComponentQueries();
		expect(queries).toBeInstanceOf(Map);
		expect(queries.has(QueryOptions.NONE)).toBe(true);
		expect(queries.has(QueryOptions.RSS)).toBe(true);
		expect(queries.has(QueryOptions.API_QUERY)).toBe(true);
		expect(queries.has(QueryOptions.HTML_META_QUERY)).toBe(true);
	});

	it("returns correct config objects for each option", () => {
		// @ts-expect-error mock data
		const queries = getComponentQueries({ apiOptions: { foo: "bar" } });
		expect(queries.get(QueryOptions.NONE)).toBeNull();
		expect(queries.get(QueryOptions.RSS)).toEqual({ id: "rss-config" });
		expect(queries.get(QueryOptions.API_QUERY)).toMatchObject({
			id: "api-config",
			foo: "bar",
		});
		expect(queries.get(QueryOptions.HTML_META_QUERY)).toEqual({
			id: "html-meta-config",
		});
	});
});

describe("getWithConfig", () => {
	it("returns a GenericInput object with correct structure", () => {
		const config = getWithConfig({
			options: [QueryOptions.NONE, QueryOptions.RSS, QueryOptions.API_QUERY],
		});
		expect(config).toHaveProperty("id", "_with");
		expect(config).toHaveProperty("type", EditInputs.inputList);
		expect(config).toHaveProperty("label", "Data Source");
		expect(config).toHaveProperty("inputs");
		expect(Array.isArray(config.inputs)).toBe(true);
		expect(config.inputs[0]).toMatchObject({
			id: "withObjectTitle",
			type: EditInputs.title,
			title: "Data Source",
		});
		expect(config.inputs[1]).toMatchObject({
			id: "type",
			type: EditInputs.objectSelect,
			label: "Select Data Source",
			required: true,
			defaultValue: QueryOptions.NONE,
			options: [QueryOptions.NONE, QueryOptions.RSS, QueryOptions.API_QUERY],
			optionId: "query",
		});
		// @ts-expect-error we know the input is an objectSelect
		expect(config.inputs[1].optionMap).toBeInstanceOf(Map);
	});

	it("uses defaultSelection if provided", () => {
		const config = getWithConfig({
			options: [QueryOptions.RSS, QueryOptions.API_QUERY],
			defaultSelection: QueryOptions.API_QUERY,
		});
		// @ts-expect-error we know the input has a defaultValue property
		expect(config.inputs[1].defaultValue).toBe(QueryOptions.API_QUERY);
	});

	it("passes apiConfigOptions to getComponentQueries", () => {
		const apiConfigOptions = { options: ["A", "B"], defaultSelection: "A" };
		const config = getWithConfig({
			options: [QueryOptions.API_QUERY],
			// @ts-expect-error apiConfigOptions incorrectly typped
			apiConfigOptions,
		});
		expect(
			// @ts-expect-error we know the input has an optionMap property
			config.inputs[1].optionMap.get(QueryOptions.API_QUERY)
		).toMatchObject({
			id: "api-config",
			options: ["A", "B"],
			defaultSelection: "A",
		});
	});
});
