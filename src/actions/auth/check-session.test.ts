import isValidSession from "./check-session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

jest.mock("../../lib/routing/paths", () => ({
	PATHS: {
		home: jest.fn(() => "/home"),
	},
}));

describe("isValidSession", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should redirect to home if session is not found", async () => {
		(getServerSession as jest.Mock).mockResolvedValueOnce(null);

		await isValidSession();

		expect(redirect).toHaveBeenCalledWith("/home");
	});

	it("should return the session if it exists", async () => {
		const mockSession = { user: { name: "Test" } };
		(getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);

		const result = await isValidSession();

		expect(result).toBe(mockSession);
		expect(redirect).not.toHaveBeenCalled();
	});
});
