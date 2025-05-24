import { githubUserReturn, googleUserReturn, returnUser } from "./user-return";
import { Profile, User } from "./types";

describe("user-return", () => {
	describe("githubUserReturn", () => {
		it("should return merged profile and user fields with correct mapping", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = {
				id: 123,
				email: "test@example.com",
				name: "Profile Name",
				image: "profile-image-url",
			};
			const user: User = {
				// @ts-expect-error - ObjectID is not a 'number'
				_id: 456,
				username: "testuser",
				avatar: "user-avatar-url",
			};

			const result = githubUserReturn(profile, user);

			expect(result).toEqual({
				...profile,
				name: user.username,
				image: user.avatar,
				id: profile.id.toString(),
				user_id: user._id.toString(),
			});
		});

		it("should convert id and user_id to strings", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = { id: 789, email: "", name: "", image: "" };
			// @ts-expect-error - ObjectID is not a 'number'
			const user: User = { _id: 101112, username: "user", avatar: "" };

			const result = githubUserReturn(profile, user);

			expect(typeof result.id).toBe("string");
			expect(typeof result.user_id).toBe("string");
			expect(result.id).toBe("789");
			expect(result.user_id).toBe("101112");
		});

		it("should overwrite profile name and image with user values", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = {
				id: 1,
				email: "",
				name: "oldName",
				image: "oldImage",
			};
			// @ts-expect-error - ObjectID is not a 'number'
			const user: User = { _id: 2, username: "newName", avatar: "newImage" };

			const result = githubUserReturn(profile, user);

			expect(result.name).toBe("newName");
			expect(result.image).toBe("newImage");
		});
	});
	describe("googleUserReturn", () => {
		it("should return merged profile and user fields with correct mapping", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = {
				id: 321,
				email: "google@example.com",
				name: "Google Profile",
				image: "google-profile-image",
			};
			const user: User = {
				// @ts-expect-error - ObjectID is not a 'number'
				_id: 654,
				username: "googleuser",
				avatar: "google-avatar-url",
			};

			const result = googleUserReturn(profile, user);

			expect(result).toEqual({
				...profile,
				name: user.username,
				image: user.avatar,
				id: user._id.toString(),
				user_id: user._id.toString(),
			});
		});

		it("should convert id and user_id to strings", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = { id: 111, email: "", name: "", image: "" };
			// @ts-expect-error - ObjectID is not a 'number'
			const user: User = { _id: 222, username: "user2", avatar: "" };

			const result = googleUserReturn(profile, user);

			expect(typeof result.id).toBe("string");
			expect(typeof result.user_id).toBe("string");
			expect(result.id).toBe("222");
			expect(result.user_id).toBe("222");
		});

		it("should overwrite profile name and image with user values", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = {
				id: 5,
				email: "",
				name: "oldGoogleName",
				image: "oldGoogleImage",
			};

			const user: User = {
				// @ts-expect-error - ObjectID is not a 'number'
				_id: 6,
				username: "newGoogleName",
				avatar: "newGoogleImage",
			};

			const result = googleUserReturn(profile, user);

			expect(result.name).toBe("newGoogleName");
			expect(result.image).toBe("newGoogleImage");
		});
	});
	describe("returnUser", () => {
		it("should return correct user for Google provider", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = {
				id: 321,
				email: "google@example.com",
				name: "Google Profile",
				image: "google-profile-image",
			};
			const user: User = {
				// @ts-expect-error - ObjectID is not a 'number'
				_id: 654,
				username: "googleuser",
				avatar: "google-avatar-url",
			};
			const result = returnUser(profile, user, "google");
			expect(result).toEqual(googleUserReturn(profile, user));
		});
		it("should return correct user for Github provider", () => {
			// @ts-expect-error - Profile has more fields
			const profile: Profile = {
				id: 321,
				email: "github@example.com",
				name: "Github Profile",
				image: "github-profile-image",
			};
			const user: User = {
				// @ts-expect-error - ObjectID is not a 'number'
				_id: 654,
				username: "githubuser",
				avatar: "github-avatar-url",
			};
			const result = returnUser(profile, user, "github");
			expect(result).toEqual(githubUserReturn(profile, user));
		});
	});
	it("should throw error for invalid provider", () => {
		// @ts-expect-error - Profile has more fields
		const profile: Profile = {
			id: 321,
			email: "mock@example.com",
			name: "Mock Profile",
			image: "mock-profile-image",
		};
		const user: User = {
			// @ts-expect-error - ObjectID is not a 'number'
			_id: 654,
			username: "mockuser",
			avatar: "mock-avatar-url",
		};
		// @ts-expect-error - Invalid provider
		expect(() => returnUser(profile, user, "mock")).toThrow("Invalid provider");
	});
});
