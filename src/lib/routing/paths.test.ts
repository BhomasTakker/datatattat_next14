import { PATHS } from "./paths";
const { signIn, signOut, home, edit, admin, user, users, error, profile } =
	PATHS;

describe("routing paths", () => {
	it("should return the correct path for the home page", () => {
		expect(home()).toBe("/");
	});

	it("should return the correct path for the edit page", () => {
		expect(edit()).toBe("/edit");
	});

	it("should return the correct path for the admin page", () => {
		expect(admin()).toBe("/admin");
	});

	it("should return the correct path for the ugiven sers page", () => {
		const username = "testuser";
		expect(user(username)).toBe(`/users/${username}`);
	});
	it("should return the correct path for the users page", () => {
		expect(users()).toBe("/users");
	});
	it("should return the correct path for the error page", () => {
		expect(error()).toBe("/error");
	});
	it("should return the correct path for the profile page", () => {
		const username = "testuser";
		expect(profile(username)).toBe(`/users/${username}/profile`);
	});
	it("should return the correct path for the signIn page", () => {
		const callback = "http://localhost:3000/callback";
		expect(signIn(callback)).toBe(`/api/auth/signin?callbackUrl=${callback}`);
	});
	it("should return the correct path for the signOut page", () => {
		const callback = "http://localhost:3000/callback";
		expect(signOut(callback)).toBe(`/api/auth/signout?callbackUrl=${callback}`);
	});
});
