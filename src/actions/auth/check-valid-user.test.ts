import { isValidUser } from "./check-valid-user";
import { getUserById } from "@/lib/mongo/actions/user/user";
import isValidSession from "./check-session";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { initialiseServices } from "@/lib/services/intialise-services";
import { IUser } from "@/types/user";
import { Session } from "@/types/auth/session";
// Mock all dependencies
jest.mock("../../lib/mongo/actions/user/user");
jest.mock("./check-session");
jest.mock("next/navigation");
jest.mock("../../lib/services/intialise-services");

const mockGetUserById = getUserById as jest.MockedFunction<typeof getUserById>;
const mockIsValidSession = isValidSession as jest.MockedFunction<
	typeof isValidSession
>;
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;
const mockInitialiseServices = initialiseServices as jest.MockedFunction<
	typeof initialiseServices
>;

describe("isValidUser", () => {
	const mockUser: IUser = {
		_id: "507f1f77bcf86cd799439011" as any,
		username: "testuser",
		signin_email: "test@example.com",
		signup_completed: true,
		signin_method: "email",
		signin_name: "Test User",
		avatar: "https://example.com/avatar.jpg",
		role: "user",
		templates: {
			pages: {},
			components: {},
		},
	};

	const mockSession: Session = {
		user: {
			user_id: "507f1f77bcf86cd799439011",
			email: "test@example.com",
			name: "Test User",
			image: "https://example.com/avatar.jpg",
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
		mockInitialiseServices.mockResolvedValue(undefined);
	});

	describe("when user is valid", () => {
		it("should return the user when session and user exist", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			mockGetUserById.mockResolvedValue(mockUser);

			// Act
			const result = await isValidUser();

			// Assert
			expect(mockIsValidSession).toHaveBeenCalledTimes(1);
			expect(mockInitialiseServices).toHaveBeenCalledTimes(1);
			expect(mockGetUserById).toHaveBeenCalledWith("507f1f77bcf86cd799439011");
			expect(mockRedirect).not.toHaveBeenCalled();
			expect(result).toEqual(mockUser);
		});
	});

	describe("when user is not found", () => {
		it("should redirect to home when user does not exist in database", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			mockGetUserById.mockResolvedValue(null as any);

			// Act
			await isValidUser();

			// Assert
			expect(mockIsValidSession).toHaveBeenCalledTimes(1);
			expect(mockInitialiseServices).toHaveBeenCalledTimes(1);
			expect(mockGetUserById).toHaveBeenCalledWith("507f1f77bcf86cd799439011");
			expect(mockRedirect).toHaveBeenCalledWith(PATHS.home());
		});

		it("should redirect to home when user is undefined", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			mockGetUserById.mockResolvedValue(undefined as any);

			// Act
			await isValidUser();

			// Assert
			expect(mockRedirect).toHaveBeenCalledWith(PATHS.home());
		});
	});

	describe("service initialization", () => {
		it("should initialize services before checking user", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			mockGetUserById.mockResolvedValue(mockUser);

			// Act
			await isValidUser();

			// Assert
			expect(mockInitialiseServices).toHaveBeenCalledTimes(1);
			// Services are initialized before getUserById is called
			expect(mockInitialiseServices).toHaveBeenCalled();
		});

		it("should handle service initialization errors", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			const serviceError = new Error("Service initialization failed");
			mockInitialiseServices.mockRejectedValue(serviceError);

			// Act & Assert
			await expect(isValidUser()).rejects.toThrow(
				"Service initialization failed"
			);
			expect(mockGetUserById).not.toHaveBeenCalled();
		});
	});

	describe("session handling", () => {
		it("should handle session validation errors", async () => {
			// Arrange
			const sessionError = new Error("Invalid session");
			mockIsValidSession.mockRejectedValue(sessionError);

			// Act & Assert
			await expect(isValidUser()).rejects.toThrow("Invalid session");
			expect(mockInitialiseServices).not.toHaveBeenCalled();
			expect(mockGetUserById).not.toHaveBeenCalled();
		});

		it("should extract user_id from session correctly", async () => {
			// Arrange
			const sessionWithDifferentUserId: Session = {
				user: {
					user_id: "different-user-456",
					email: "different@example.com",
					name: "Different User",
					image: "https://example.com/different-avatar.jpg",
				},
			};
			mockIsValidSession.mockResolvedValue(sessionWithDifferentUserId);
			mockGetUserById.mockResolvedValue(mockUser);

			// Act
			await isValidUser();

			// Assert
			expect(mockGetUserById).toHaveBeenCalledWith("different-user-456");
		});
	});

	describe("database interaction", () => {
		it("should handle database errors gracefully", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			const dbError = new Error("Database connection failed");
			mockGetUserById.mockRejectedValue(dbError);

			// Act & Assert
			await expect(isValidUser()).rejects.toThrow("Database connection failed");
			expect(mockRedirect).not.toHaveBeenCalled();
		});
	});

	describe("integration scenarios", () => {
		it("should handle the complete flow with valid data", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			mockGetUserById.mockResolvedValue(mockUser);

			// Act
			const result = await isValidUser();

			// Assert - verify the complete flow
			expect(mockIsValidSession).toHaveBeenCalledTimes(1);
			expect(mockInitialiseServices).toHaveBeenCalledTimes(1);
			expect(mockGetUserById).toHaveBeenCalledWith("507f1f77bcf86cd799439011");
			expect(result).toBe(mockUser);
			expect(mockRedirect).not.toHaveBeenCalled();
		});

		it("should handle empty user object", async () => {
			// Arrange
			mockIsValidSession.mockResolvedValue(mockSession);
			mockGetUserById.mockResolvedValue({} as any);

			// Act
			const result = await isValidUser();

			// Assert
			expect(result).toEqual({});
			expect(mockRedirect).not.toHaveBeenCalled();
		});
	});
});
