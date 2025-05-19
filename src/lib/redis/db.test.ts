// Mock the Redis import
jest.mock("ioredis", () => {
	return {
		__esModule: true,
		default: jest.fn(() => {
			return { some: "connection" };
		}),
	};
});
// need throw error test
describe("redis db", () => {
	describe("connectToRedisDB", () => {
		afterEach(() => {
			// Clear the mock after each test
			jest.clearAllMocks();
		});
		it("should return a Redis connection", () => {
			// Import the function to test
			const { connectToRedisDB } = require("./db");

			// Call the function
			const connection = connectToRedisDB();

			// Check that the connection is the same as the mock connection
			// strong equality
			expect(connection).not.toBe({ some: "connection" });
			// Loose equality
			expect(connection).toEqual({ some: "connection" });
		});
		it("Should return a cached connection", () => {
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
