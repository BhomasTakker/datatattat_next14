import isValidSession from "./check-session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../../app/api/auth/[...nextauth]/options";
import { PATHS } from "../../lib/routing/paths";
import type { Session } from "@/types/auth/session";

// Mock external dependencies
jest.mock("next-auth");
jest.mock("next/navigation");
jest.mock("../../app/api/auth/[...nextauth]/options");
jest.mock("../../lib/routing/paths");

// Type the mocked functions
const mockGetServerSession = getServerSession as jest.MockedFunction<
	typeof getServerSession
>;
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;
const mockPaths = PATHS as jest.Mocked<typeof PATHS>;

describe("isValidSession", () => {
	const mockValidSession: Session = {
		user: {
			name: "John Doe",
			email: "john.doe@example.com",
			image: "https://example.com/avatar.jpg",
			user_id: "user_123",
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();

		// Setup default mock for PATHS.home
		mockPaths.home = jest.fn().mockReturnValue("/");
	});

	describe("when session exists", () => {
		it("should return the session without redirecting", async () => {
			mockGetServerSession.mockResolvedValue(mockValidSession);

			const result = await isValidSession();

			expect(mockGetServerSession).toHaveBeenCalledWith(options);
			expect(result).toEqual(mockValidSession);
			expect(mockRedirect).not.toHaveBeenCalled();
			expect(mockPaths.home).not.toHaveBeenCalled();
		});

		it("should return session with all required user properties", async () => {
			const sessionWithAllProps: Session = {
				user: {
					name: "Jane Smith",
					email: "jane@example.com",
					image: "https://example.com/jane.jpg",
					user_id: "user_456",
				},
			};
			mockGetServerSession.mockResolvedValue(sessionWithAllProps);

			const result = await isValidSession();

			expect(result).toEqual(sessionWithAllProps);
			expect(result.user).toHaveProperty("name", "Jane Smith");
			expect(result.user).toHaveProperty("email", "jane@example.com");
			expect(result.user).toHaveProperty(
				"image",
				"https://example.com/jane.jpg"
			);
			expect(result.user).toHaveProperty("user_id", "user_456");
		});

		it("should handle session with minimal user data", async () => {
			const minimalSession: Session = {
				user: {
					name: "Minimal User",
					email: "minimal@example.com",
					image: "",
					user_id: "user_min",
				},
			};
			mockGetServerSession.mockResolvedValue(minimalSession);

			const result = await isValidSession();

			expect(result).toEqual(minimalSession);
			expect(mockRedirect).not.toHaveBeenCalled();
		});
	});

	describe("when session does not exist", () => {
		it("should redirect to home when session is null", async () => {
			mockGetServerSession.mockResolvedValue(null);
			mockRedirect.mockImplementation(() => {
				throw new Error("NEXT_REDIRECT"); // Simulate Next.js redirect behavior
			});

			await expect(isValidSession()).rejects.toThrow("NEXT_REDIRECT");

			expect(mockGetServerSession).toHaveBeenCalledWith(options);
			expect(mockPaths.home).toHaveBeenCalled();
			expect(mockRedirect).toHaveBeenCalledWith("/");
		});

		it("should redirect to home when session is undefined", async () => {
			mockGetServerSession.mockResolvedValue(undefined);
			mockRedirect.mockImplementation(() => {
				throw new Error("NEXT_REDIRECT");
			});

			await expect(isValidSession()).rejects.toThrow("NEXT_REDIRECT");

			expect(mockGetServerSession).toHaveBeenCalledWith(options);
			expect(mockPaths.home).toHaveBeenCalled();
			expect(mockRedirect).toHaveBeenCalledWith("/");
		});

		it("should use correct home path from PATHS", async () => {
			const customHomePath = "/custom-home";
			mockPaths.home.mockReturnValue(customHomePath);
			mockGetServerSession.mockResolvedValue(null);
			mockRedirect.mockImplementation(() => {
				throw new Error("NEXT_REDIRECT");
			});

			await expect(isValidSession()).rejects.toThrow("NEXT_REDIRECT");

			expect(mockPaths.home).toHaveBeenCalledTimes(1);
			expect(mockRedirect).toHaveBeenCalledWith(customHomePath);
		});
	});

	describe("error handling", () => {
		it("should handle getServerSession throwing an error", async () => {
			const mockError = new Error("Auth service unavailable");
			mockGetServerSession.mockRejectedValue(mockError);

			await expect(isValidSession()).rejects.toThrow(
				"Auth service unavailable"
			);

			expect(mockGetServerSession).toHaveBeenCalledWith(options);
			expect(mockRedirect).not.toHaveBeenCalled();
		});

		it("should handle redirect throwing an error", async () => {
			mockGetServerSession.mockResolvedValue(null);
			const redirectError = new Error("Redirect failed");
			mockRedirect.mockImplementation(() => {
				throw redirectError;
			});

			await expect(isValidSession()).rejects.toThrow("Redirect failed");

			expect(mockGetServerSession).toHaveBeenCalledWith(options);
			expect(mockPaths.home).toHaveBeenCalled();
			expect(mockRedirect).toHaveBeenCalledWith("/");
		});
	});

	describe("integration behavior", () => {
		it("should call getServerSession with correct options", async () => {
			mockGetServerSession.mockResolvedValue(mockValidSession);

			await isValidSession();

			expect(mockGetServerSession).toHaveBeenCalledTimes(1);
			expect(mockGetServerSession).toHaveBeenCalledWith(options);
		});

		it("should cast session to Session type correctly", async () => {
			const rawSession = {
				user: {
					name: "Test User",
					email: "test@example.com",
					image: "test.jpg",
					user_id: "test_123",
				},
				expires: "2024-12-31T23:59:59.999Z",
			};
			mockGetServerSession.mockResolvedValue(rawSession);

			const result = await isValidSession();

			// The function should return the session cast as Session type
			expect(result).toEqual(rawSession);
			expect(result.user).toBeDefined();
			expect(result.user.user_id).toBe("test_123");
		});
	});

	describe("type safety", () => {
		it("should handle session without user property gracefully", async () => {
			const sessionWithoutUser = {} as Session;
			mockGetServerSession.mockResolvedValue(sessionWithoutUser);

			const result = await isValidSession();

			expect(result).toEqual(sessionWithoutUser);
			expect(mockRedirect).not.toHaveBeenCalled();
		});

		it("should handle session with partial user data", async () => {
			const partialSession = {
				user: {
					name: "Partial User",
					email: "partial@example.com",
					image: "",
					user_id: "",
				},
			} as Session;
			mockGetServerSession.mockResolvedValue(partialSession);

			const result = await isValidSession();

			expect(result).toEqual(partialSession);
			expect(result.user.name).toBe("Partial User");
			expect(result.user.user_id).toBe("");
		});
	});
});
