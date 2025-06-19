import { Profile } from "@/lib/next-auth/types";
import "@testing-library/jest-dom";

jest.mock("next-auth", () => ({
	getServerSession: jest.fn(),
}));

jest.mock("../src/lib/next-auth/providers/github", () => ({
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

jest.mock("../src/lib/next-auth/providers/google", () => ({
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
