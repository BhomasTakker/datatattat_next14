import { fetchWithCache } from "./redis-fetch";

jest.mock("./db", () => {
	return {
		__esModule: true,
		connectToRedisDB: jest.fn(() => {
			return {
				client: {
					get: jest.fn().mockResolvedValue({ mocked: "data" }),
				},
			};
		}),
	};
});

const mockFetchFn = jest.fn().mockImplementation(() => {
	return new Promise((resolve) => {
		resolve({ data: "mocked data" });
	});
});

afterEach(() => {
	// Clear the mock after each test
	jest.clearAllMocks();
});

// we need to be able to mock RedisDB client

describe("redis fetch", () => {
	describe("fetchWithCache", () => {
		it("calls given fetch function when in dev node environment", async () => {
			const processNodeEnv = process.env.NODE_ENV;
			// @ts-expect-error - we are testing the error case
			process.env.NODE_ENV = "development";
			const result = await fetchWithCache(mockFetchFn, "test-key");
			expect(mockFetchFn).toHaveBeenCalledTimes(1);
			expect(result).toEqual({ data: "mocked data" });

			// Reset the environment variable
			// @ts-expect-error - resetting process.env.NODE_ENV
			process.env.NODE_ENV = processNodeEnv;
		});
	});
});
