import isSignupComplete from "./signup-completed";
import { redirect } from "next/navigation";
import * as checkValidUser from "../auth/check-valid-user";
import { PATHS } from "@/lib/routing/paths";
import { Profile } from "@/lib/next-auth/types";

jest.mock("../../actions/user/get-user", () => ({
	getUser: jest.fn(),
}));

jest.mock("../../actions/auth/check-session", () => ({
	getUser: jest.fn(),
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

jest.mock("../auth/check-valid-user");
jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

describe("isSignupComplete", () => {
	const mockIsValidUser = checkValidUser.isValidUser as jest.Mock;

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should redirect to profile if signup is not completed", async () => {
		mockIsValidUser.mockResolvedValue({
			signup_completed: false,
			username: "testuser",
		});

		await isSignupComplete();

		expect(redirect).toHaveBeenCalledWith(PATHS.profile("testuser"));
	});

	it("should not redirect if signup is completed", async () => {
		mockIsValidUser.mockResolvedValue({
			signup_completed: true,
			username: "testuser",
		});

		await isSignupComplete();

		expect(redirect).not.toHaveBeenCalled();
	});
});
