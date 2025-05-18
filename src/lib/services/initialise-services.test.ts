import { connectToMongoDB } from "../mongo/db";
import { connectToRedisDB } from "../redis/db";
import { initialiseServices } from "./intialise-services";

jest.mock("../mongo/db", () => {
	return {
		connectToMongoDB: jest.fn().mockResolvedValue({}),
	};
});
jest.mock("../redis/db", () => {
	return {
		connectToRedisDB: jest.fn().mockResolvedValue({}),
	};
});

afterEach(() => {
	jest.clearAllMocks();
});

describe("initialise-services", () => {
	it("should initialiseMongoDB", async () => {
		await initialiseServices();

		expect(connectToMongoDB).toHaveBeenCalledTimes(1);
	});
	it("should initialiseRedisDB", async () => {
		await initialiseServices();

		expect(connectToRedisDB).toHaveBeenCalledTimes(1);
	});
});
