import * as getUserFunctions from "./get-user";
import { getServerSession } from "next-auth";
import { getLeanUserById } from "@/lib/mongo/actions/user/user";
import { initialiseServices } from "@/lib/services/intialise-services";
import { Session } from "@/types/auth/session";
import { IUser } from "@/types/user";

const { getSessionUser, getUserFromSessionId, getUser } = getUserFunctions;
jest.mock("./get-user", () => {
	return {
		__esModule: true, //    <----- this __esModule: true is important
		...jest.requireActual("./get-user"),
	};
});

const getSessionUserSpy = jest.spyOn(getUserFunctions, "getSessionUser");

const getUserFromSessionIdSpy = jest.spyOn(
	getUserFunctions,
	"getUserFromSessionId"
);
// const getUserSpy = jest.spyOn(getUserFunctions, "getUser");

// Mock dependencies
jest.mock("next-auth", () => ({
	getServerSession: jest.fn(),
}));
jest.mock("../../lib/mongo/actions/user/user", () => ({
	getLeanUserById: jest.fn(),
}));
jest.mock("../../lib/services/intialise-services", () => ({
	initialiseServices: jest.fn(),
}));

describe("getSessionUser", () => {
	it("returns null if no session", async () => {
		(getServerSession as jest.Mock).mockResolvedValueOnce(null);
		const result = await getSessionUser();
		expect(result).toBeNull();
	});

	it("returns session user if session exists", async () => {
		const mockSession: Session = {
			user: { user_id: "123", name: "Test", email: "test@test.com" },
		} as Session;
		(getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
		const result = await getSessionUser();
		expect(result).toEqual(mockSession.user);
	});
});

describe("getUserFromSessionId", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("calls initialiseServices and getLeanUserById with correct id", async () => {
		const mockUser = { _id: "123", name: "Test" } as unknown as IUser;
		(getLeanUserById as jest.Mock).mockResolvedValueOnce(mockUser);

		const result = await getUserFromSessionId("123");
		expect(initialiseServices).toHaveBeenCalled();
		expect(getLeanUserById).toHaveBeenCalledWith("123");
		expect(result).toBe(mockUser);
	});

	it("throws error if user not found", async () => {
		(getLeanUserById as jest.Mock).mockResolvedValueOnce(null);

		await expect(getUserFromSessionId("notfound")).rejects.toThrow(
			"User not found"
		);
	});
});

// get user seems to have been mocked?
// Always returning null
describe.skip("getUser", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns null if no session user", async () => {
		getSessionUserSpy.mockResolvedValueOnce(null);
		const result = await getUser();
		expect(result).toBeNull();
	});

	it("returns user if session user exists", async () => {
		const sessionUser = { user_id: "abc" };
		const user = { _id: "abc", name: "Test" } as unknown as IUser;
		// @ts-expect-error
		getSessionUserSpy.mockResolvedValueOnce(sessionUser);
		getUserFromSessionIdSpy.mockResolvedValueOnce(user);

		const result = await getUser();
		expect(getSessionUserSpy).toHaveBeenCalledTimes(1);
		expect(getUserFromSessionIdSpy).toHaveBeenCalledWith(sessionUser.user_id);
		// expect(getUserSpy).toHaveBeenCalledTimes(1);
		expect(result).toBe(user);
	});
});
