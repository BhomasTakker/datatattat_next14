import {
	createGoogleUser,
	createGithubUser,
	createUserObject,
	loginOrSignUp,
	providerMap,
} from "./user-login";
import { providers, Providers, Profile, User } from "./types";
import * as mongoActions from "../mongo/actions/user";
import * as mongoDb from "../mongo/db";
import * as signupActions from "../../actions/signup/check-create-username";

jest.mock("../../actions/user/get-user", () => ({
	getUser: jest.fn(),
}));
jest.mock("./providers/github", () => ({
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

jest.mock("./providers/google", () => ({
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

jest.mock("../mongo/actions/user");
jest.mock("../mongo/db");
jest.mock("../../actions/signup/check-create-username");

const OLD_ENV = process.env;

const googleProfile = {
	name: "Test Google",
	email: "google@example.com",
	picture: "http://avatar.com/google.png",
} as any;

const githubProfile = {
	login: "githubuser",
	email: "github@example.com",
	avatar_url: "http://avatar.com/github.png",
} as any;

describe("createGoogleUser", () => {
	beforeEach(() => {
		process.env = { ...OLD_ENV };
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("should create a user object from Google profile", () => {
		const user = createGoogleUser(googleProfile, providers.google, "testuser");
		expect(user).toEqual({
			signup_completed: false,
			signin_method: providers.google,
			signin_name: googleProfile.name,
			signin_email: googleProfile.email,
			avatar: googleProfile.picture,
			username: "testuser",
			role: "standard",
		});
	});
});

describe("createGithubUser", () => {
	it("should create a user object from Github profile", () => {
		const user = createGithubUser(githubProfile, providers.github, "testuser");
		expect(user).toEqual({
			signup_completed: false,
			signin_method: providers.github,
			signin_name: githubProfile.login,
			signin_email: githubProfile.email,
			avatar: githubProfile.avatar_url,
			username: "testuser",
			role: "standard",
		});
	});
});

describe("providerMap", () => {
	it("should map google provider to createGoogleUser", () => {
		expect(providerMap.get(providers.google)).toBeInstanceOf(Function);
	});
	it("should map github provider to createGithubUser", () => {
		expect(providerMap.get(providers.github)).toBeInstanceOf(Function);
	});
});

describe("createUserObject", () => {
	it("should create user object for google", () => {
		const user = createUserObject(
			googleProfile,
			providers.google,
			"uniqueuser"
		);
		expect(user.signin_method).toBe(providers.google);
		expect(user.username).toBe("uniqueuser");
	});

	it("should create user object for github", () => {
		const user = createUserObject(
			githubProfile,
			providers.github,
			"uniqueuser"
		);
		expect(user.signin_method).toBe(providers.github);
		expect(user.username).toBe("uniqueuser");
	});

	it("should throw error for invalid provider", () => {
		expect(() =>
			createUserObject(googleProfile, "invalid" as Providers, "user")
		).toThrow("Invalid provider");
	});
});

describe("loginOrSignUp", () => {
	const mockUser = { _id: "1", username: "existinguser" } as unknown as User;

	beforeEach(() => {
		jest.clearAllMocks();
		(mongoDb.connectToMongoDB as jest.Mock).mockResolvedValue(undefined);
		(signupActions.checkAndCreateUsername as jest.Mock).mockImplementation(
			async (username: string) => username + "_unique"
		);
	});

	it("should return existing user if found", async () => {
		(mongoActions.getUserBySignInEmail as jest.Mock).mockResolvedValue(
			mockUser
		);
		const user = await loginOrSignUp(googleProfile, providers.google);
		expect(user).toBe(mockUser);
		expect(mongoActions.createNewUser).not.toHaveBeenCalled();
	});

	it("should create new user if not found", async () => {
		(mongoActions.getUserBySignInEmail as jest.Mock).mockResolvedValue(null);
		(mongoActions.createNewUser as jest.Mock).mockImplementation(
			async (userObj: any) => ({ ...userObj, _id: "2" })
		);
		const user = await loginOrSignUp(githubProfile, providers.github);
		expect(mongoActions.createNewUser).toHaveBeenCalled();
		expect(user._id).toBe("2");
		expect(user.username).toContain("_unique");
	});

	it("should use profile.name for username if present", async () => {
		(mongoActions.getUserBySignInEmail as jest.Mock).mockResolvedValue(null);
		(mongoActions.createNewUser as jest.Mock).mockImplementation(
			async (userObj: any) => userObj
		);
		await loginOrSignUp(googleProfile, providers.google);
		expect(signupActions.checkAndCreateUsername).toHaveBeenCalledWith(
			googleProfile.name
		);
	});

	it("should use profile.login for username if name is not present", async () => {
		const profile = { login: "ghlogin", email: "gh@example.com" } as any;
		(mongoActions.getUserBySignInEmail as jest.Mock).mockResolvedValue(null);
		(mongoActions.createNewUser as jest.Mock).mockImplementation(
			async (userObj: any) => userObj
		);
		await loginOrSignUp(profile, providers.github);
		expect(signupActions.checkAndCreateUsername).toHaveBeenCalledWith(
			"ghlogin"
		);
	});
});
