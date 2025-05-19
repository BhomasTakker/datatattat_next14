// need throw error test
// not sure the cached connection means much
describe("redis db", () => {
	describe("connectToRedisDB", () => {
		afterEach(() => {
			// Clear the mock after each test
			jest.clearAllMocks();
		});
		it("should return a Redis connection", () => {
			// Mock the Redis constructor
			const mockRedis = jest.fn();
			const mockConnection = { some: "connection" };
			(mockRedis as any).mockReturnValue(mockConnection);

			// Mock the Redis import
			jest.mock("ioredis", () => {
				return {
					__esModule: true,
					default: mockRedis,
				};
			});

			// Import the function to test
			const { connectToRedisDB } = require("./db");

			// Call the function
			const connection = connectToRedisDB();

			// Check that the connection is the same as the mock connection
			expect(connection).toBe(mockConnection);
		});
		it("Should return a cached connection", () => {
			const mockRedis = jest.fn();
			const mockConnection = { some: "connection" };
			(mockRedis as any).mockReturnValue(mockConnection);

			// Mock the Redis import
			jest.mock("ioredis", () => {
				return {
					__esModule: true,
					default: mockRedis,
				};
			});

			// Import the function to test
			const { connectToRedisDB } = require("./db");

			// Call the function
			const connection1 = connectToRedisDB();
			const connection2 = connectToRedisDB();
			// Check that the connection is the same as the mock connection
			expect(connection1).toBe(connection2);
		});
	});
});
