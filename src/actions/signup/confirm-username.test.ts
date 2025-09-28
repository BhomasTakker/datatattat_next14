import { confirmUsername } from "./confirm-username";
import { updateUser } from "../../lib/mongo/actions/user/user";
import { isUsernameValid } from "./check-username";
import { isValidUser } from "../auth/check-valid-user";
import { initialiseServices } from "../../lib/services/intialise-services";

jest.mock("../../lib/mongo/actions/user/user");
jest.mock("./check-username");
jest.mock("../auth/check-valid-user");
jest.mock("../../lib/services/intialise-services");

jest.mock("../../actions/user/get-user", () => ({
	getUser: jest.fn(),
}));

jest.mock("../../actions/auth/check-session", () => ({
	getUser: jest.fn(),
}));

describe("confirmUsername", () => {
	const mockUser = { _id: { toString: () => "user123" } };

	beforeEach(() => {
		(initialiseServices as jest.Mock).mockResolvedValue(undefined);
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return message if user is not found", async () => {
		(isValidUser as jest.Mock).mockResolvedValue(null);

		const result = await confirmUsername("testuser");
		expect(result).toEqual({ message: "User not found" });
		expect(isValidUser).toHaveBeenCalled();
	});

	it("should return message if username is not valid", async () => {
		(isValidUser as jest.Mock).mockResolvedValue(mockUser);
		(isUsernameValid as jest.Mock).mockResolvedValue(false);

		const result = await confirmUsername("baduser");
		expect(result).toEqual({ message: "Username is not valid" });
		expect(isUsernameValid).toHaveBeenCalledWith("baduser");
	});

	it("should update user and return updated user on success", async () => {
		const updatedUser = {
			_id: "user123",
			username: "gooduser",
			signup_completed: true,
		};
		(isValidUser as jest.Mock).mockResolvedValue(mockUser);
		(isUsernameValid as jest.Mock).mockResolvedValue(true);
		(updateUser as jest.Mock).mockResolvedValue(updatedUser);

		const result = await confirmUsername("gooduser");
		expect(updateUser).toHaveBeenCalledWith("user123", {
			signup_completed: true,
			username: "gooduser",
		});
		expect(result).toBe(updatedUser);
	});

	it("should handle errors from updateUser gracefully", async () => {
		(isValidUser as jest.Mock).mockResolvedValue(mockUser);
		(isUsernameValid as jest.Mock).mockResolvedValue(true);
		(updateUser as jest.Mock).mockRejectedValue(new Error("DB error"));

		const result = await confirmUsername("gooduser");
		expect(result).toEqual({ message: "Error updating user" });
	});

	it("should call initialiseServices before anything else", async () => {
		(isValidUser as jest.Mock).mockResolvedValue(null);

		await confirmUsername("testuser");
		expect(initialiseServices).toHaveBeenCalled();
	});
});
