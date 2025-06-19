import { getData } from "./get-data";
import { ComponentDataFactory } from "@/lib/api/component-data/component-data-factory";
import { ComponentDataOptions } from "@/lib/api/component-data/component-data-options";
import { With } from "@/types/page";

// Mock dependencies
jest.mock("../../lib/api/component-data/component-data-factory");

describe("getData", () => {
	const mockType = "mockType" as unknown as ComponentDataOptions;
	const mockQuery = { foo: "bar" };
	const mockQueryObject: With = {
		type: mockType,
		query: mockQuery,
	} as unknown as With;

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns empty object and logs when no queryObject is provided", async () => {
		const consoleSpy = jest.spyOn(console, "log").mockImplementation();
		const result = await getData(undefined as any);
		expect(consoleSpy).toHaveBeenCalledWith("No query object provided");
		expect(result).toEqual({});
		consoleSpy.mockRestore();
	});

	it("returns empty object if ComponentDataFactory returns undefined", async () => {
		(ComponentDataFactory as jest.Mock).mockReturnValue(undefined);
		const result = await getData(mockQueryObject);
		expect(result).toEqual({});
		expect(ComponentDataFactory).toHaveBeenCalledWith(mockType);
	});

	it("calls dataFetcher with query and returns its result", async () => {
		const mockData = { data: "test" };
		const mockFetcher = jest.fn().mockResolvedValue(mockData);
		(ComponentDataFactory as jest.Mock).mockReturnValue(mockFetcher);

		const result = await getData(mockQueryObject);

		expect(ComponentDataFactory).toHaveBeenCalledWith(mockType);
		expect(mockFetcher).toHaveBeenCalledWith(mockQuery);
		expect(result).toBe(mockData);
	});

	it("handles missing type and query gracefully", async () => {
		(ComponentDataFactory as jest.Mock).mockReturnValue(undefined);
		const result = await getData({} as With);
		expect(result).toEqual({});
	});
});
