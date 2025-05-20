import { ComponentDataFactory } from "./component-data-factory";
import { ComponentDataMap } from "./component-data-map";
import { ComponentDataOptions } from "./component-data-options";

// seems like an unnessary test?
// We are kind of just testing Maps here?
jest.mock("./component-data-map", () => ({
	ComponentDataMap: {
		get: jest.fn(),
	},
}));

describe("ComponentDataFactory", () => {
	const mockId = "test-id" as unknown as ComponentDataOptions;
	const mockData = { foo: "bar" };

	beforeEach(() => {
		(ComponentDataMap.get as jest.Mock).mockClear();
	});

	it("should call ComponentDataMap.get with the provided id", () => {
		(ComponentDataMap.get as jest.Mock).mockReturnValue(mockData);

		ComponentDataFactory(mockId);

		expect(ComponentDataMap.get).toHaveBeenCalledWith(mockId);
	});

	it("should return the data object from ComponentDataMap", () => {
		(ComponentDataMap.get as jest.Mock).mockReturnValue(mockData);

		const result = ComponentDataFactory(mockId);

		expect(result).toBe(mockData);
	});

	it("should return undefined if ComponentDataMap.get returns undefined", () => {
		(ComponentDataMap.get as jest.Mock).mockReturnValue(undefined);

		const result = ComponentDataFactory(mockId);

		expect(result).toBeUndefined();
	});
});
