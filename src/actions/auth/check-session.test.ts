import isValidSession from "./check-session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { Profile } from "@/lib/next-auth/types";

jest.mock("next-auth", () => ({
	getServerSession: jest.fn(),
}));
jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));
jest.mock("../../lib/routing/paths", () => ({
	PATHS: {
		home: jest.fn(() => "/home"),
	},
}));

jest.mock("../../lib/next-auth/providers/github", () => ({
	GITHUB: {
		id: "github",
		name: "GitHub",
		type: "oauth",
		version: "2.0",
		scope: "read:user user:email",
		profile(profile: Profile) {
			return { id: profile.id, name: profile.name, email: profile.email };
		},
	},
}));

jest.mock("../../lib/next-auth/providers/google", () => ({
	GOOGLE: {
		id: "google",
		name: "Google",
		type: "oauth",
		version: "2.0",
		scope: "read:user user:email",
		profile(profile: Profile) {
			return { id: profile.id, name: profile.name, email: profile.email };
		},
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
