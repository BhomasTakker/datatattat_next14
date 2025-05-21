import {
	getUserBySignInEmail,
	getUserById,
	getUserByUsername,
	getAllUserByUsername,
	createNewUser,
	updateUser,
} from "./user";
import { User } from "../../../models/User";
import { IUser } from "../../../types/user";

jest.mock("../../../models/User");

type MockUser = Partial<IUser>;

const mockUser: MockUser = {
	// @ts-expect-error we need to explicitly set _id as undefined
	_id: "123",
	username: "testuser",
	signin_email: "test@example.com",
	signup_completed: true,

	signin_method: "",
	signin_name: "",
	avatar: "",

	role: "test",
	// add other IUser fields as needed
};

describe("user actions", () => {
	beforeEach(() => {
		console.error = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getUserBySignInEmail", () => {
		it("should return user by signin_email", async () => {
			(User.findOne as jest.Mock).mockResolvedValue(mockUser);
			const result = await getUserBySignInEmail("test@example.com");
			expect(User.findOne).toHaveBeenCalledWith({
				signin_email: "test@example.com",
			});
			expect(result).toBe(mockUser);
		});
	});

	describe("getUserById", () => {
		it("should return user by id", async () => {
			(User.findOne as jest.Mock).mockResolvedValue(mockUser);
			const result = await getUserById("123");
			expect(User.findOne).toHaveBeenCalledWith({ _id: "123" });
			expect(result).toBe(mockUser);
		});
	});

	describe("getUserByUsername", () => {
		it("should decode username and return user", async () => {
			// Mock the decodeURI function?
			// not sure the decode is having any effects?
			(User.findOne as jest.Mock).mockResolvedValue(mockUser);
			const result = await getUserByUsername("testuser");
			expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
			expect(result).toBe(mockUser);
		});
	});

	describe("getAllUserByUsername", () => {
		it("should decode username and return all users", async () => {
			(User.find as jest.Mock).mockResolvedValue([mockUser]);
			const result = await getAllUserByUsername("testuser");
			expect(User.find).toHaveBeenCalledWith({ username: "testuser" });
			expect(result).toEqual([mockUser]);
		});
	});

	describe("createNewUser", () => {
		it("should create and save a new user", async () => {
			const saveMock = jest.fn().mockResolvedValue(mockUser);
			(User as unknown as jest.Mock).mockImplementation(() => ({
				save: saveMock,
			}));
			const mock = { ...mockUser, _id: undefined };
			// @ts-expect-error we need to explicitly set _id as undefined
			const result = await createNewUser(mock);
			expect(saveMock).toHaveBeenCalled();
			expect(result).toBe(mockUser);
		});

		it("should handle errors and return error message", async () => {
			const saveMock = jest.fn().mockRejectedValue(new Error("fail"));
			(User as unknown as jest.Mock).mockImplementation(() => ({
				save: saveMock,
			}));
			// @ts-expect-error we need to explicitly set _id as undefined
			const result = await createNewUser({ ...mockUser, _id: undefined });
			expect(result).toEqual({ message: "Error creating user" });
		});
	});

	describe("updateUser", () => {
		it("should update user and return success message", async () => {
			(User.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUser);
			const result = await updateUser("123", { username: "updated" });
			expect(User.findOneAndUpdate).toHaveBeenCalledWith(
				{ _id: "123" },
				{ username: "updated" },
				{ new: true }
			);
			expect(result).toEqual({ message: "User Updated" });
		});

		it("should handle errors and return error message", async () => {
			(User.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("fail"));
			const result = await updateUser("123", { username: "updated" });
			expect(result).toEqual({ message: "Error updating user" });
		});
	});
});
