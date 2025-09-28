import {
	checkUserAuthorized,
	checkAdminAuthorized,
	checkUserAuth,
} from "./check-user-auth";
import { getServerSession } from "next-auth";
import { getUserById } from "../../lib/mongo/actions/user/user";
import { initialiseServices } from "../../lib/services/intialise-services";

// Mock dependencies with relative imports
jest.mock("next-auth");
jest.mock("../../lib/mongo/actions/user/user");
jest.mock("../../lib/services/intialise-services");

const mockGetServerSession = getServerSession as jest.MockedFunction<
	typeof getServerSession
>;
const mockGetUserById = getUserById as jest.MockedFunction<typeof getUserById>;
const mockInitialiseServices = initialiseServices as jest.MockedFunction<
	typeof initialiseServices
>;

describe("check-user-auth", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("checkUserAuthorized", () => {
		it("should allow access to user's home route", async () => {
			const username = "testuser";
			const route = "/users/testuser";

			await expect(
				checkUserAuthorized(username, route)
			).resolves.toBeUndefined();
		});

		it("should allow access to user's sub-routes", async () => {
			const username = "testuser";
			const route = "/users/testuser/profile";

			await expect(
				checkUserAuthorized(username, route)
			).resolves.toBeUndefined();
		});

		it("should throw error for unauthorized route", async () => {
			const username = "testuser";
			const route = "/users/otheruser";

			await expect(checkUserAuthorized(username, route)).rejects.toThrow(
				"Unauthorized"
			);
		});

		it("should throw error for partial username match", async () => {
			const username = "jim";
			const route = "/users/jimsmith";

			await expect(checkUserAuthorized(username, route)).rejects.toThrow(
				"Unauthorized"
			);
		});

		it("should allow access when route starts with user home path followed by slash", async () => {
			const username = "testuser";
			const route = "/users/testuser/some/deep/path";

			await expect(
				checkUserAuthorized(username, route)
			).resolves.toBeUndefined();
		});
	});

	describe("checkAdminAuthorized", () => {
		it("should allow access for admin role", async () => {
			const role = "admin";

			await expect(checkAdminAuthorized(role)).resolves.toBeUndefined();
		});

		it("should throw error for non-admin role", async () => {
			const role = "user";

			await expect(checkAdminAuthorized(role)).rejects.toThrow("Unauthorized");
		});

		it("should throw error for empty role", async () => {
			const role = "";

			await expect(checkAdminAuthorized(role)).rejects.toThrow("Unauthorized");
		});
	});

	describe("checkUserAuth", () => {
		const mockSession = {
			user: {
				user_id: "123",
				name: "Test User",
				email: "test@example.com",
			},
		};

		const mockUserData = {
			signup_completed: true,
			signin_method: "github",
			signin_name: "Test User",
			signin_email: "test@example.com",
			avatar: "https://example.com/avatar.jpg",
			username: "testuser",
			role: "user",
			templates: {
				pages: {},
				components: {},
			},
			_id: "507f1f77bcf86cd799439011" as any,
		};

		beforeEach(() => {
			mockInitialiseServices.mockResolvedValue();
			mockGetUserById.mockResolvedValue(mockUserData);
		});

		it("should throw error when no session found", async () => {
			mockGetServerSession.mockResolvedValue(null);
			const route = "/users/testuser";

			await expect(checkUserAuth(route)).rejects.toThrow("No session found");
		});

		it("should allow user access to their own page", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			const route = "/users/testuser";

			await expect(checkUserAuth(route)).resolves.toBeUndefined();
			expect(mockInitialiseServices).toHaveBeenCalled();
			expect(mockGetUserById).toHaveBeenCalledWith("123");
		});

		it("should allow user access to their own sub-pages", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			const route = "/users/testuser/profile";

			await expect(checkUserAuth(route)).resolves.toBeUndefined();
		});

		it("should throw error when user tries to access another user's page", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			const route = "/users/otheruser";

			await expect(checkUserAuth(route)).rejects.toThrow("Unauthorized");
		});

		it("should allow admin access to non-user pages", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			mockGetUserById.mockResolvedValue({
				...mockUserData,
				role: "admin",
			});
			const route = "/admin/dashboard";

			await expect(checkUserAuth(route)).resolves.toBeUndefined();
		});

		it("should throw error when non-admin user tries to access non-user pages", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			const route = "/admin/dashboard";

			await expect(checkUserAuth(route)).rejects.toThrow("Unauthorized");
		});

		it("should handle user pages starting with /users", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			const route = "/users/testuser/edit";

			await expect(checkUserAuth(route)).resolves.toBeUndefined();
		});

		it("should call initialiseServices", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			const route = "/users/testuser";

			await checkUserAuth(route);

			expect(mockInitialiseServices).toHaveBeenCalledTimes(1);
		});

		it("should call getUserById with correct user_id", async () => {
			mockGetServerSession.mockResolvedValue(mockSession);
			const route = "/users/testuser";

			await checkUserAuth(route);

			expect(mockGetUserById).toHaveBeenCalledWith("123");
		});
	});
});
